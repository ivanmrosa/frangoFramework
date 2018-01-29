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

host = '127.0.0.1'
port = 8081
server_address = (host, port)
base_url = 'http://' + host + ':' + str(port)
dirjs = os.path.dirname(os.path.abspath(__file__)) + '/js'
base_dir = os.path.dirname(os.path.abspath(__file__))
sever_runing = False


HTML_REUSABLE_TEMPLATE = \
'''
<div id="[{([[[COMPONENT_NAME]]]) id }]">
Component: [[[COMPONENT_NAME]]]
<div>
'''


REGISTER_COMPONENT_JS = \
'''
app.components.push(function () {
    frango.component('[[[COMPONENT_NAME]]]').
        setPathLocalTemplate('components/[[[COMPONENT_NAME]]]/template/[[[COMPONENT_NAME]]].html').
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

   /*write the component functionalites here*/
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

    def do_GET(self):
        # Send response status code
        getting_template = self.headers["GETTEMPLATE"]
        path = 'app.html' if self.path == '/' else self.path[1:]
        
        #building an single page application
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
            self.send_header('Content-type', mimetype)
            self.end_headers()

            try:
                f = open(path, 'rb')
                self.wfile.write(bytes(f.read()))
                return
            except IOError:
                self.send_error(404, 'File Not Found: %s' % path)

        return


def get_dependency_file(mode='r'):
    return open(dirjs + '/js-dependency.json', mode)


def get_js_dependency_files():
    with get_dependency_file() as fconfig:
        files = json.loads(fconfig.read())
    return files["general-js"] + files["components-js"]


def create_centralizer_js():
    centralizerjs = dirjs + '/js-centralizer.js'

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


def put_routes_together():
    try:
        component_path = os.path.join(base_dir, 'components')
        route_app_file = open(os.path.join(
            base_dir, 'js', 'app-routes.js'), 'w')
        route_app_file.seek(0)
        
        new_routes = {}

        for component_name in os.listdir(component_path):
            component_folder = os.path.join(component_path, component_name)
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
                compile()
                break


def create_register_component(path, component_name):
    with open(os.path.join(path, component_name + '-register.js'), 'w') as f:
        f.write(REGISTER_COMPONENT_JS.replace(
            "[[[COMPONENT_NAME]]]", component_name))

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
        template = 'Component ' + component_name
    
    f = open(os.path.join(path, component_name + '.html'), 'w')
    f.write(template)
    f.close()

def insert_js_dependency(path, component_name):
    with get_dependency_file(mode='r+') as f:
        config = json.loads(f.read())
        config["components-js"].append('components/' + component_name +
                                       '/js/' + component_name + '-register.js')
        config["components-js"].append('components/' +
                                       component_name + '/js/' + component_name + '.js')
        f.seek(0)
        f.write(json.dumps(config, indent=4))
        f.truncate()

def delete_js_dependency(path, component_name):
    with get_dependency_file(mode='r+') as f:
        config = json.loads(f.read())
        try:
            config["components-js"].remove('components/' + component_name +
                                        '/js/' + component_name + '-register.js')
            config["components-js"].remove('components/' +
                                        component_name + '/js/' + component_name + '.js')
        except ValueError as e:
            pass

        f.seek(0)
        f.write(json.dumps(config, indent=4))
        f.truncate()
    

def create_component_route(path, component_name):
    try:
        f = open(os.path.join(path, component_name + '-route.json'), 'w')
        f.write(ROUTE_COMPONENT_JSON_TEMPLANTE.replace('[[[COMPONENT_NAME]]]', component_name))
        f.close()
    except Exception as e:
        f.close()
        raise

def validade_component_name(component_name):
    regex = '[/\\~"\'^-]'
    m = re.findall(regex, component_name, re.DOTALL)
    if m:
        raise Exception('You cannot use ' + regex + ' keys in component name')
    #findall(regex, text, re.DOTALL)

def create_component(component_name, reusable):
    validade_component_name(component_name)
    component_directory = os.path.join(base_dir, 'components', component_name)
    cjsdir = os.path.join(component_directory, 'js')
    ctemplatedir = os.path.join(component_directory, 'template')
    if os.path.exists(component_directory):
        raise Exception('Component alredy exists')
    # root
    os.makedirs(component_directory)
    # js
    os.makedirs(cjsdir)
    # template
    os.makedirs(ctemplatedir)
    # register-component js file
    create_register_component(cjsdir, component_name)
    # controller js file
    create_controller_component(cjsdir, component_name, reusable)
    # template-component html file
    create_template_html_file(ctemplatedir, component_name, reusable)
    # insert js on js-dependency
    insert_js_dependency(cjsdir, component_name)
    #insert file component-route.json
    create_component_route(component_directory, component_name)


def delete_component(component_name):
    print('Do you realy want to remove the component ' + component_name + '? ')
    response = input('Please enter y/n ')
    if not response in ['y', 'n']:
        raise Exception('Argument not recognized')

    if response == 'y':
        component_directory = os.path.join(base_dir, 'components', component_name)
        cjsdir = os.path.join(component_directory, 'js')
        delete_js_dependency(cjsdir, component_name)
        shutil.rmtree(component_directory)


def compile():
    print('compiling...')

    #try:
    create_centralizer_js()
    put_routes_together()
    #except Exception as e:
    #    raise Exception('compile failed.. ' + str(e))

    print('compiled...')


def serve():
    compile()
    print('starting server...')
    httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
    print('running server at ' + base_url + '...')
    # Server settings
    # Choose port 8080, for port 80, which is normally used for a http server, you need root access
    #  server_address = ('127.0.0.1', 8081)
    httpd.serve_forever()

def run_serve():
    th_server = threading.Thread(target=serve)
    th_check_file = threading.Thread(
        target=check_modifications, args=(th_server,))
    th_server.start()
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
    browser.get('http://localhost:8081/frango-framework-build-app')
    print('loading application..')
    time.sleep(20)
    html = browser.page_source
    html = '<!doctype HTML>' + html
    with open(os.path.join(bin_dir, 'index.html'), 'w') as f:
        f.write(html)
    
    browser.quit()    
    print('Build completed. Look at ' + bin_dir)




def run():
    if len(sys.argv) > 1:
        command = sys.argv[1]
    else:
        command = 'serve'

    if command == 'compile' or command == 'cp':
        compile()
    elif command == 'serve' or command == 'sv':
        run_serve()
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
    else:
      raise Exception('Nothing defined for ' + command + ' command')


run()
