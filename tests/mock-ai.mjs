import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
const fixture=JSON.parse(readFileSync('tests/fixtures/extraction.json','utf8'));
createServer(async(req,res)=>{if(req.method==='GET'){res.end('local test provider');return;}for await(const _ of req){void _;}res.setHeader('Content-Type','application/json');res.end(JSON.stringify({id:'resp_local_test',object:'response',created_at:0,model:'gpt-4.1-mini',status:'completed',output:[{id:'msg_local_test',type:'message',role:'assistant',status:'completed',content:[{type:'output_text',text:JSON.stringify(fixture),annotations:[]}]}],usage:{input_tokens:100,output_tokens:100,total_tokens:200}}));}).listen(55330,'127.0.0.1');
