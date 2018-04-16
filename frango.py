#!/usr/bin/python3
# coding utf-8
#import requests
import os
import sys
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler
import json
from time import mktime
import time
from datetime import datetime
import shutil
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.common.exceptions import NoSuchElementException
import msvcrt

host = '127.0.0.1'
port = 8081
server_address = (host, port)
base_url = 'http://' + host + ':' + str(port)
#base_dirjs = os.path.dirname(os.path.abspath(__file__)) + '/js'
base_dir = os.getcwd()  #os.path.dirname(os.path.abspath(__file__))
base_dirjs =  os.path.join(base_dir, 'js')
base_dircss =  os.path.join(base_dir, 'css')

regex_debug_script = r'<!--begin script debugger-->.*<!--end script debugger-->'

HTML_SIMPLE_TEMPLATE = \
'''
<div id="[[[COMPONENT_NAME]]]" class="[[[COMPONENT_NAME]]]">
Component: [[[COMPONENT_NAME]]]
</div>
'''

HTML_REUSABLE_TEMPLATE = \
'''
<div id="[{([[[COMPONENT_NAME]]]) id }]" class="[[[COMPONENT_NAME]]]">
Component: [[[COMPONENT_NAME]]]
</div>
'''


REGISTER_COMPONENT_JS = \
'''
app.components.push(function () {
    frango.component('[[[COMPONENT_NAME]]]').
        setPathLocalTemplate('components/[[[CONTAINER_NAME]]][[[COMPONENT_NAME]]]/template/[[[COMPONENT_NAME]]].html').
        objectGetData([[[COMPONENT_NAME]]]Component).
        controller([[[COMPONENT_NAME]]]Component.controller).
        register()
});
'''

CONTROLLER_COMPONENT_JS = \
'''
[[[COMPONENT_NAME]]]Component = {
    getData : function(){

    },
    controller: function(component){
       component.bindData();
    }
}
'''

CONTROLLER_COMPONENT_REUSABLE_JS = \
'''
function [[[COMPONENT_NAME]]]Class(instanceId) {
   //use htmlComponent.find() to access the child elements  
   var htmlComponent = frango.find('#' + instanceId);
      
}


[[[COMPONENT_NAME]]]Component = {

    controller: function (component) {
        //This implementation permites to create component by url route
        var instanceID = component.componentID;
        [[[COMPONENT_NAME]]]Component.getInitialData(instanceID, function(data){
           component.bindData(data, true, function () {
               /*on finish*/ 
           });
        });    

    },
    
    getInitialData : function(componentID, callBack){
        var dataTemplate = {
           '[[[COMPONENT_NAME]]]': [{
                id: componentID
            }]
         };
         callBack(dataTemplate);
       
    },
    
    getInstance : function(componentID, methodToSendInstance){
        //This implementation permites to create reusable component. The property data-auto-create in the component html must be setted to "no".
        frango.useNestedComponent(componentID, function(){            
            var component = frango.getComponent('[[[COMPONENT_NAME]]]');
            var instanceID = component.componentID;
            
            [[[COMPONENT_NAME]]]Component.getInitialData(instanceID, function(data){
                component.bindData(data, true, function () {
		            var instance = new [[[COMPONENT_NAME]]]Class(componentID);
                    if(methodToSendInstance){
                       methodToSendInstance(instance);    
                    };		            
                });    
            }); 
        });
    }
};

'''


COMPONENT_CSS_TEMPLATE  = \
'''
/*always use the component class to select specific style roles - for general roles use app.css*/
/*
.[[[COMPONENT_NAME]]] .some_element {
}
*/
'''

ROUTES_FILE_TEMPLATE = \
'''
frango.app.configureRote(function () {
    /*url : component-name*/

    frango.app.routes = 
        [[[JSON-URL:COMPONENTS]]]
    
});

'''

ROUTE_COMPONENT_JSON_TEMPLANTE = \
'''
{
    "url": "",
    "componentName": "[[[COMPONENT_NAME]]]"
}
'''

class testHTTPServer_RequestHandler(SimpleHTTPRequestHandler):

    def get_MIME(self, key):
        mime = {
                ".aac": "audio/aac",
                ".abw": "application/x-abiword",
                ".arc": "application/octet-stream",
                ".avi": "video/x-msvideo",
                ".azw": "application/vnd.amazon.ebook",
                ".bin": "application/octet-stream",
                ".bz": "application/x-bzip",
                ".bz2": "application/x-bzip2",
                ".csh": "application/x-csh",
                ".css": "text/css",
                ".csv": "text/csv",
                ".doc": "application/msword",
                ".eot": "application/vnd.ms-fontobject",
                ".epub": "application/epub+zip",
                ".gif": "image/gif",
                ".htm": "",
                ".html": "text/html",
                ".ico": "image/x-icon",
                ".ics": "text/calendar",
                ".jar": "application/java-archive",
                ".jpeg": "",
                ".jpg": "image/jpeg",
                ".js": "application/javascript",
                ".json": "application/json",
                ".mid": "",
                ".midi": "audio/midi",
                ".mpeg": "video/mpeg",
                ".mpkg": "application/vnd.apple.installer+xml",
                ".odp": "application/vnd.oasis.opendocument.presentation",
                ".ods": "application/vnd.oasis.opendocument.spreadsheet",
                ".odt": "application/vnd.oasis.opendocument.text",
                ".oga": "audio/ogg",
                ".ogv": "video/ogg",
                ".ogx": "application/ogg",
                ".otf": "font/otf",
                ".png": "image/png",
                ".pdf": "application/pdf",
                ".ppt": "application/vnd.ms-powerpoint",
                ".rar": "application/x-rar-compressed",
                ".rtf": "application/rtf",
                ".sh": "application/x-sh",
                ".svg": "image/svg+xml",
                ".swf": "application/x-shockwave-flash",
                ".tar": "application/x-tar",
                ".tif": "",
                ".tiff": "image/tiff",
                ".ts": "application/typescript",
                ".ttf": "font/ttf",
                ".vsd": "application/vnd.visio",
                ".wav": "audio/x-wav",
                ".weba": "audio/webm",
                ".webm": "video/webm",
                ".webp": "image/webp",
                ".woff": "font/woff",
                ".woff2": "font/woff2",
                ".xhtml": "application/xhtml+xml",
                ".xls": "",
                ".xlsx": "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "",
                ".xml": "application/xml",
                ".xul": "application/vnd.mozilla.xul+xml",
                ".zip": "application/zip",
                ".3gp": "video/3gpp",
                "audio/3gpp": "",
                ".3g2": "video/3gpp2",
                "audio/3gpp2": "",
                ".7z": "application/x-7z-compressed",
                ".map" : "magnus-internal/imagemap"
                }
                
        if not key in mime:
            result =  ''
        else:
            result = mime[key]
        
        return result
    
    def do_OPTIONS(self):           
        self.send_response(200)       
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header("Access-Control-Allow-Headers", '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.end_headers()
        
        return

    def do_GET(self):
        # Send response status code
        getting_template = self.headers["GETTEMPLATE"]
        path = 'app.html' if self.path == '/' else self.path[1:]
        
        #building a single page application
        pathSplited = path.split('/')
        if pathSplited[0] ==  'frango-framework-build-app':
            path = 'app.html'
        
        path = path.split('?')[0]
        sendReply = False
        mimetype = self.get_MIME(os.path.splitext(path)[1])

        sendReply = len(mimetype) > 0

        if sendReply == True:
            # Send headers
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header("Access-Control-Allow-Headers", '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
            self.send_header('Content-type', mimetype)
            self.end_headers()

            try:
                f = open(path, 'rb')
                self.wfile.write(bytes(f.read()))
                return
            except IOError:
                self.send_error(404, 'File Not Found: %s' % path)

        return


def get_dependency_js_file(mode='r'):
    return open(os.path.join(base_dirjs, 'js-dependency.json'), mode)

def get_dependency_css_file(mode='r'):
    return open(os.path.join(base_dirjs, 'css-dependency.json'), mode)


def get_js_dependency_files():
    with get_dependency_js_file() as fconfig:
        files = json.loads(fconfig.read())
    return files["general-js"] + files["components-js"]

def put_js_in_page(debugging = False):
    script = ""
    app_html = ""
    if debugging:
        files = get_js_dependency_files()
    else:
        files = ['js/js-centralizer.js']
        

    for path in files:
        script += '  <script type="text/javascript" src="{0}"></script>\n'.format(path.replace('\\', '/'))        

    script = '<!--begin script debugger-->\n' + script + '  <!--end script debugger-->'
    
    with open(os.path.join(base_dir, 'app.html'), 'r+') as f:
        app_html = f.read()
        app_html = re.sub(regex_debug_script, script, app_html, 0, re.DOTALL)
        f.seek(0)
        f.truncate()
        f.seek(0)
        f.write(app_html)    

        


def get_css_dependency_files():
    with get_dependency_css_file() as fconfig:
        files = json.loads(fconfig.read())
    return files["general-css"] + files["components-css"]


def create_centralizer_js():
    centralizerjs = os.path.join(base_dirjs, 'js-centralizer.js')

    files = get_js_dependency_files()

    fcentralize = open(centralizerjs, 'w')

    try:
        for fi in files:
            with open(base_dir + '/' + fi, 'r') as fjs:
                fcentralize.write('\n')
                fcentralize.write(fjs.read())
        fcentralize.close()
    except Exception as e:
        fcentralize.close()
        raise Exception('compile failed.. ' + str(e))


def create_centralizer_css():
    centralizerjs = os.path.join(base_dircss, 'css-centralizer.css')

    files = get_css_dependency_files()

    fcentralize = open(centralizerjs, 'w')

    try:
        for fi in files:
            with open(base_dir + '/' + fi, 'r') as fjs:
                fcentralize.write('\n')
                fcentralize.write(fjs.read())
        fcentralize.close()
    except Exception as e:
        fcentralize.close()
        raise Exception('compile failed.. ' + str(e))

def put_routes_together():
    try:
        #component_path = os.path.join(base_dir, 'components')
        with open(os.path.join(base_dirjs, 'components-config.json'), 'r') as fcomponent:
            component_config = json.loads(fcomponent.read())
        
        route_app_file = open(os.path.join(
            base_dir, 'js', 'app-routes.js'), 'w')
        route_app_file.seek(0)
        
        new_routes = {}

        for component_name in component_config:
            relative_path = component_config[component_name]
            component_folder = base_dir + relative_path
            if os.path.isdir(component_folder):
                component_rote_json = os.path.join(
                    component_folder, component_name + '-route.json')
                with open(component_rote_json) as routef:
                    routes = json.loads(routef.read())
                    if routes["url"] and routes["componentName"]:
                        new_routes.update({routes["url"]: routes["componentName"]})

        route_app_file.write(ROUTES_FILE_TEMPLATE.replace(
            '[[[JSON-URL:COMPONENTS]]]', json.dumps(new_routes, indent = 4) ))

        route_app_file.close()
    except Exception as e:
        route_app_file.close()
        raise Exception(e)


def file_modified(path):
    file_mod_time = os.stat(path).st_mtime
    last_time = (time.time() - file_mod_time)
    return last_time < 3


def check_modifications(thread_server):
    compiling = False
    while thread_server.is_alive():
        time.sleep(3)
        files = get_js_dependency_files()
        for fi in files:
            if file_modified(base_dir + '/' + fi):
                compile(debugging=True)
                break
        files = get_css_dependency_files()
        for fi in files:
            if file_modified(base_dir + '/' + fi):
                compile(debugging=True)
                break


def create_register_component(path, component_name, container):
    container_and_slash = container
    if container:
        container_and_slash += "/" 
    else:
        container_and_slash = ""


    with open(os.path.join(path, component_name + '-register.js'), 'w') as f:
        f.write(REGISTER_COMPONENT_JS.replace(
            "[[[COMPONENT_NAME]]]", component_name).replace('[[[CONTAINER_NAME]]]', container_and_slash) )

def create_controller_component(path, component_name, reusable):
        
    if reusable:
        template = CONTROLLER_COMPONENT_REUSABLE_JS
    else:
        template = CONTROLLER_COMPONENT_JS
    
    with open(os.path.join(path, component_name + '.js'), 'w') as f:
        f.write(template.replace(
            "[[[COMPONENT_NAME]]]", component_name))


def create_template_html_file(path, component_name, reusable):
    if reusable:
        template = HTML_REUSABLE_TEMPLATE.replace("[[[COMPONENT_NAME]]]", component_name)
    else:
        template = HTML_SIMPLE_TEMPLATE.replace("[[[COMPONENT_NAME]]]", component_name)
    
    f = open(os.path.join(path, component_name + '.html'), 'w')
    f.write(template)
    f.close()


def create_template_css_file(path, component_name):
    template = COMPONENT_CSS_TEMPLATE.replace("[[[COMPONENT_NAME]]]", component_name)        
    f = open(os.path.join(path, component_name + '.css'), 'w')
    f.write(template)
    f.close()    


def insert_js_dependency(path, component_name):
    relative_path = path.replace(base_dir, '')
    with get_dependency_js_file(mode='r+') as f:
        config = json.loads(f.read())
        config["components-js"].append(os.path.join(relative_path, component_name + '-register.js'))
        config["components-js"].append(os.path.join(relative_path, component_name + '.js'))
        f.seek(0)
        f.write(json.dumps(config, indent=4))
        f.truncate()

def insert_css_dependency(path, component_name):    
    relative_path = path.replace(base_dir, '')    
    with get_dependency_css_file(mode='r+') as f:
        config = json.loads(f.read())
        config["components-css"].append(os.path.join(relative_path, component_name + '.css'))
        f.seek(0)
        f.write(json.dumps(config, indent=4))
        f.truncate()

def delete_component_config(component_name):
    fcomponent = open(os.path.join(base_dirjs, 'components-config.json'), 'r+')
    component_config = json.loads(fcomponent.read())
    del component_config[component_name]
    fcomponent.seek(0)
    fcomponent.write(json.dumps(component_config, indent=4))
    fcomponent.truncate()
    fcomponent.close()
    


def delete_js_dependency(path, component_name):
    relative_path = path.replace(base_dir, '')    
    with get_dependency_js_file(mode='r+') as f:
        config = json.loads(f.read())
        try:
            config["components-js"].remove(os.path.join(relative_path, component_name + '-register.js'))
            config["components-js"].remove(os.path.join(relative_path, component_name + '.js'))
        except ValueError:
            pass

        f.seek(0)
        f.write(json.dumps(config, indent=4))
        f.truncate()
    
def delete_css_dependency(path, component_name):
    relative_path = path.replace(base_dir, '')    
    with get_dependency_css_file(mode='r+') as f:
        config = json.loads(f.read())
        try:
            config["components-css"].remove(os.path.join(relative_path, component_name + '.css'))
        except ValueError:
            pass

        f.seek(0)
        f.write(json.dumps(config, indent=4))
        f.truncate()
    
def create_component_route(path, component_name):
    try:
        f = open(os.path.join(path, component_name + '-route.json'), 'w')
        f.write(ROUTE_COMPONENT_JSON_TEMPLANTE.replace('[[[COMPONENT_NAME]]]', component_name))
        f.close()
    except Exception:
        f.close()
        raise

def validade_component_name(component_name):
    regex = '[/\\~"\'^-]'
    m = re.findall(regex, component_name, re.DOTALL)
    if m:
        raise Exception('You cannot use ' + regex + ' keys in component name')
    #findall(regex, text, re.DOTALL)

def create_container(container_name):
    os.makedirs(os.path.join(base_dir, 'components', container_name))


def create_component(component_name, reusable):
    validade_component_name(component_name)    
    container_name = input('Type the container name this component belongs to or leave blank... ')
    container_name = container_name.strip()
    if container_name:
        if os.path.isdir(os.path.join(base_dir, 'components', container_name)):
            component_directory = os.path.join(base_dir, 'components', container_name, component_name)            
        else:
            raise Exception('Invalid container. Type a existent container name')
    else:    
        component_directory = os.path.join(base_dir, 'components', component_name)        
    
    cjsdir = os.path.join(component_directory, 'js')
    cssdir = os.path.join(component_directory, 'css')
    ctemplatedir = os.path.join(component_directory, 'template')
    
    
    
    fcomponent = open(os.path.join(base_dirjs, 'components-config.json'), 'r+')
    component_config = json.loads(fcomponent.read())
    if component_name in component_config:
        raise Exception('Component alredy exists')

    # root
    os.makedirs(component_directory)
    # js
    os.makedirs(cjsdir)
    #css
    os.makedirs(cssdir)
    # template
    os.makedirs(ctemplatedir)
    # register-component js file
    create_register_component(cjsdir, component_name, container_name)
    # controller js file
    create_controller_component(cjsdir, component_name, reusable)
    # template-component html file
    create_template_html_file(ctemplatedir, component_name, reusable)
    # template-component css file
    create_template_css_file(cssdir, component_name)
    # insert js on js-dependency
    insert_js_dependency(cjsdir, component_name)
    # insert cs on css-dependency
    insert_css_dependency(cssdir, component_name)
    #insert file component-route.json
    create_component_route(component_directory, component_name)
    component_config.update({component_name: component_directory.replace(base_dir, '')})
    fcomponent.seek(0)
    fcomponent.write(json.dumps(component_config, indent = 4))
    fcomponent.close()
    
        

def delete_component(component_name):
    container_name = input('Type the container name this component belongs to or leave blank... ')
    container_name = container_name.strip()

    if container_name:
        if os.path.isdir(os.path.join(base_dir, 'components', container_name)):
            component_directory = os.path.join(base_dir, 'components', container_name, component_name)
        else:
            raise Exception('Invalid container. Type a existent container name')
    else:    
        component_directory = os.path.join(base_dir, 'components', component_name)


    print('Do you realy want to remove the component ' + component_directory + '? ')
    response = input('Please enter y/n ')
    if not response in ['y', 'n']:
        raise Exception('Argument not recognized')

    if response == 'y':        
        cjsdir = os.path.join(component_directory, 'js')
        cssdir = os.path.join(component_directory, 'css')
        delete_js_dependency(cjsdir, component_name)
        delete_css_dependency(cssdir, component_name)
        delete_component_config(component_name)
        shutil.rmtree(component_directory)


def compile(debugging = False):
    print('compiling...')
   
    create_centralizer_js()
    put_js_in_page(debugging)
            
    create_centralizer_css()
    put_routes_together()
 
    print('compiled...')


def kbfunc():
   x = msvcrt.kbhit()
   if x:
      ret = ord(msvcrt.getch())
   else:
      ret = 0
   return ret

def chek_key_press(server_class):    

    while True:
        try:
            time.sleep(1)
            x = kbfunc()            
            if x == 4: # Ctrl-D            
                raise KeyboardInterrupt('Execution interrupted by user.')            
        except KeyboardInterrupt as identifier:                                    
            server_class.shutdown()
            server_class.socket.close()            
            #server_th
            #server_sd_th, 
            #check_fl_th            
            break

class HTTPServerBreak(HTTPServer):
    def service_actions(self):        
        x = kbfunc()                    
        if x == 4: # Ctrl-D            
            raise KeyboardInterrupt('Execution interrupted by user.')        

def serve(debugging = False):
    compile(debugging)
    print('starting server...')
    httpd = HTTPServerBreak(server_address, testHTTPServer_RequestHandler)
    print('running server at ' + base_url + '...')
    print('press CTRL + D to stop')
    # Server settings
    # Choose port 8080, for port 80, which is normally used for a http server, you need root access
    #  server_address = ('127.0.0.1', 8081)
    #th_check_press = threading.Thread(target=chek_key_press, args=(httpd,))
    #th_check_press.start()
    httpd.serve_forever()
     
    raise Exception('Server closed by user.')
    

def run_serve(debugging = False):
    th_server = threading.Thread(target=serve, args=(debugging,))
    th_check_file = threading.Thread(
        target=check_modifications, args=(th_server,))
    th_server.start()
    if debugging:
        th_check_file.start()


def build(): 
    bin_dir = ""
    
    if os.path.exists(os.path.join(base_dir, 'config.json')):
        with open(os.path.join(base_dir, 'config.json'), 'r') as cf:
            confi = json.loads(cf.read())
            bin_dir = confi["build-directory"]

    if bin_dir == "":
        bin_dir = input('Please type the directory for generate the files.') #os.path.join(base_dir, 'bin')
        
    if(os.path.exists(bin_dir)):
        remove = input('The directory already exists. It will be deleted. Do you confirm? yes/no .')
        if remove == 'yes':           
           shutil.rmtree(bin_dir)
        else:
           raise Exception('Operation canceled by user.')
    
    
    run_serve()  
    os.makedirs(bin_dir)
    compile()
    shutil.copytree(os.path.join(base_dir,'css'), os.path.join(bin_dir,'css'))
    shutil.copytree(os.path.join(base_dir,'extra-frameworks'),os.path.join(bin_dir,'extra-frameworks'))
    shutil.copytree(os.path.join(base_dir,'img'),os.path.join(bin_dir,'img'))
    shutil.copytree(os.path.join(base_dir,'js'),os.path.join(bin_dir,'js'))
    shutil.copytree(os.path.join(base_dir,'frango'),os.path.join(bin_dir,'frango'))
    
    browser = webdriver.Firefox()
    print('loading application..')
    browser.get('http://localhost:8081/frango-framework-build-app')

    element = None    
    while not element:
        try:
            element = browser.find_element_by_class_name("frango-built")
        except NoSuchElementException as e:
            pass
    
    
    #time.sleep(20)
    html = browser.page_source
    html = '<!doctype HTML>' + html
    with open(os.path.join(bin_dir, 'index.html'), 'w') as f:
        f.write(html)
    
    browser.quit()    
    print('Build completed. Look at ' + bin_dir)


def create_project():
  project_name = input('Please, type a name for the project:')  
  template_dir  = os.path.join( os.path.dirname(os.path.abspath(__file__)),  'template')
  shutil.copytree(template_dir, os.path.join(base_dir, project_name))  
  print('Project created on ' + template_dir, os.path.join(base_dir, project_name) )

def run():
        
    if len(sys.argv) > 1:
        command = sys.argv[1]
    else:
        command = 'serve'

    if command == 'compile' or command == 'cp':
        compile()
    elif command == 'serve' or command == 'sv':
        run_serve(debugging=True)
    elif command == 'createcomponent' or command == 'cc':
        component_name = sys.argv[2]
        reusable = False
        if len(sys.argv) > 3:
            third_arg = sys.argv[3]
            if third_arg == 'reusable' or third_arg == 'rs' :
                reusable = True

        create_component(component_name, reusable)
    elif command == 'removecomponent' or command == 'rc' :
        delete_component(sys.argv[2])
    elif command == 'build' or command == 'bl':
        build()
    elif command == 'createproject' or command == 'cp':
        create_project()
    elif command == 'createcontainer' or command == 'ccn':
        container_name = sys.argv[2]
        create_container(container_name)
    else:
      raise Exception('Nothing defined for ' + command + ' command')

if __name__ == '__main__':
    run()
