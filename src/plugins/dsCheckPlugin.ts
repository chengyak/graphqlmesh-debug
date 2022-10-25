
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { URL } from 'url' 
import type { Plugin as YogaPlugin } from 'graphql-yoga';

require('dotenv').config()

/**
 * plugin to add health check endpoint, support graphql and openapi source handlers for now.
 * graphql: check url.origin/readiness
 * openapi: check the swagger endpoint: url from 'source'
 */

const dsCheckPlugin: YogaPlugin = {
    async onRequest({ url, fetchAPI, endResponse }) {
      if(url.pathname == '/healthchecks') {
        console.log(url.pathname)
        try {
          const doc = yaml.load(fs.readFileSync(path.join(process.cwd(), '.meshrc.yml'), 'utf8'));
          for (const ds of doc.sources) {
            console.log('check data source:' + ds.name);
            if (ds.handler.graphql!=undefined) {
              const ep_var = ds.handler.graphql.endpoint.replace('{', '').replace('}','').split('.');
              const url = new URL(process[ep_var[0]][ep_var[1]])
              const response = await fetch(url.origin +'/readiness');
              console.log('health check for data source: ' + ds.name + ' status code: ' + response.status)
              if (response.status != 200) {
                const response = new fetchAPI.Response('Data Soource connection check failed', {
                  headers: {
                    'Content-Type': 'text/html; charset=UTF-8',
                  },
                  status: 400
                });
                endResponse(response);
                return 
              }
            }
            else if (ds.handler.openapi!=undefined) {
              const ep_var = ds.handler.openapi.source.replace('{', '').replace('}','').split('.');
              const url = new URL(process[ep_var[0]][ep_var[1]])
              const response = await fetch(url.href);
              console.log('health check for data source: ' + ds.name + ' status code: ' + response.status)
              if (response.status != 200) {
                const response = new fetchAPI.Response('Data Soource connection check failed', {
                  headers: {
                    'Content-Type': 'text/html; charset=UTF-8',
                  },
                  status: 400
                });
                endResponse(response);
                return 
              }
            }
          }
        } catch (e) {
          console.log(e);
          const response = new fetchAPI.Response('Data Soource connection check failed', {
            headers: {
              'Content-Type': 'text/html; charset=UTF-8',
            },
            status: 400
          });
          endResponse(response);
          return 
        }
        const response = new fetchAPI.Response("Data Soource connection check successful", {
            headers: {
              'Content-Type': 'text/html; charset=UTF-8',
            },
            status: 200
          });
          endResponse(response);
      }  
    }
}

export default dsCheckPlugin