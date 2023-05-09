import React from 'react';
import { useEffect } from 'react';


export const Trie =(props)=>{
console.log(props.word);
let init ='cat';

// start with the TrieNode
const TrieNode = function (key) {

    // the "key" value will be the character in sequence
    this.key = key;
    
    // keep a reference to parent
    this.parent = null;
    
    // have hash of children
    this.children = {};
    
    // check to see if the node is at the end
    this.end = false;
    
    this.getWord = function() {
      let output = [];
      let node = this;
  
      while (node !== null) {
        output.unshift(node.key);
        node = node.parent;
      }
  
      return output.join('');
    };
  }

/* create a Trie data structure */
  const Trie = function(){
    this.root=new TrieNode(null);
   this.insert=function(value){
 if(!value){
     throw new Error('Value is undefined');
 }
 
 let node=this.root;
 for(let item of value){
   
    if(!node.children[item]){
       node.children[item]=new TrieNode(item);
       node.children[item].parent=node;
    }
    node=node.children[item];
    if(item===value[value.length-1]){
      node.end=true;
    }
   
   
     
     
     
 }
    }
 }

useEffect(()=>{
    let tri = new Trie();
    tri.insert(props.word); 
    tri.insert('car');
    tri.insert('care');
    console.log(tri.root); 
},[props.word]);




    return(<div>
        <h1>Trie data </h1>
    </div>)
}