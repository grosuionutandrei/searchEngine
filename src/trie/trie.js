import React, { useState } from 'react';
import { useEffect } from 'react';


export const Trie =(props)=>{

  /* state update for the searched word */
const [getSearch,setSearch]=useState([]);




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
  class Trie {
    constructor() {
      this.root = new TrieNode(null);
    }

      /* insert a word in to the trie */
  // inserts a word into the trie.
  insert = function(word) {
    let node = this.root; // we start at the root

    // for every character in the word
    for(let i = 0; i < word.length; i++) {
      // check to see if character node exists in children.
      if (!node.children[word[i]]) {
        // if it doesn't exist, we then create it.
        node.children[word[i]] = new TrieNode(word[i]);

        // we also assign the parent to the child node.
        node.children[word[i]].parent = node;
      }

      // proceed to the next depth in the trie.
      node = node.children[word[i]];

      // finally, we check to see if it's the last word.
      if (i === word.length-1) {
        // if it is, we set the end flag to true.
        node.end = true;
      }
    }
  };
      /* search if an word exist into the trie */
   isWord(word){
  let node =this.root;  
  let isword=false;
   
   for(let elem of word){
    /* if node doe not include the letter return false */
     if(!(node.children[elem.toLowerCase()])){
      return [word,false];
     }
     /* got ot the next node  */
     node=node.children[elem.toLowerCase()];
/* check if node is the end off the word */
     if(elem===word[word.length-1]){
       node.end?isword=true:isword=false;
     }
  }
return [word,isword];   
   }

   /* find prefix */
   find(prefix){
    let node=this.root;
    let words=[];
    for(let i=0;i<prefix.length;i++){
         if(node.children[prefix[i]]){
            node=node.children[prefix[i]]
         }else{
          return [prefix,words];
         }
    }

    this.navigate(node,words);
    return [prefix,words]
   }

/* recursivelly get the words for the searched prefix */
   navigate(node,words){

    if(node.end){
       words.unshift(node.getWord());
    }
  for(let elem in node.children){
  this.navigate(node.children[elem],words);
  }}





isEmpty(node){
  let size =Object.keys(node.children);
  return size.length<0;
}


remove(node,word){
if(word.length===0){
    if(!node.end){
           return false;
    }else{
      node.end=false;
      return true;
    }
}else{
  let firstLetter=word.substring(0,1);
  let remainderOffWord=word.substring(1); 
  let currNode=node.children[firstLetter];
  if(!currNode){
    console.log("notNode");
    return false;
  }else{
   
    let ret = this.remove(currNode,remainderOffWord);
    console.log(currNode.key,currNode.end,Object.keys(currNode.children).length)
    if(Object.keys(currNode.children).length<1 && (!currNode.end) ){
    console.log("inside",currNode.key);
     currNode.parent.children={};
        return ret;
    }

      
  }
  
  
  

 
}

}
  

  }

useEffect(()=>{
  let tri = new Trie();
  tri.insert('cat');
  tri.insert('car');
  tri.insert('cav');
  tri.insert('cas');
  tri.insert('case');
  tri.insert('care');
 
  tri.remove(tri.root,'cas');

console.log(tri.root.children["c"].children["a"].children["r"].children['e'])
  let isWord ,word;
   [isWord,word]=tri.isWord('cat');
   console.log(word,isWord);
   let prefix , isPresent;
  [prefix,isPresent]=tri.find('ca');
 console.log(prefix,isPresent);
setSearch(isPresent);
  

},[props.word])
 
  


   /* render the search results */
  const renderSearch=(results)=>{
    /* reverse the worder of array resulted from finding the prefix words */
    let inter=[...results];
    let reversed=inter.reverse();
    return reversed.map((elem)=>
    
            <li key={elem}>{<p>{elem.slice(0,props.search.length)}
            <span style={{color:"red"}}>{elem.slice(props.search.length,elem.length)}</span>
            </p>}</li>
    )
  }



    return(<div>
        <h1>Trie Data</h1>
        <ul>
         {renderSearch(getSearch)}
        </ul>
    </div>)
}