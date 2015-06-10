var path = window.location.pathname;
var styleName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
if(!styleName) styleName = 'index';
// console.log(styleName);
var editor = document.querySelector('body style[contenteditable]');
var def = editor.innerHTML;
document.getElementById('reset').onclick = function(e){
  editor.innerHTML = def;
};
var savedData = localStorage.getItem(styleName);
if(savedData && savedData.trim()){
  editor.innerHTML = savedData;
}
editor.focus();
editor.onkeydown = function(e){
  // console.log(e.keyCode);
  if(e.keyCode === 9){
    //Tabキーで半角スペース2個
    e.preventDefault();
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    // sel.removeAllRanges();
    range.deleteContents();
    var text = document.createTextNode("  ");
    range.insertNode(text);
    // range.insertnode(node);
    range.selectNode(text);
    // range.setStartAfter(text);
    // range.setEndAfter(text);
    range.collapse();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  // var style = window.getComputedStyle(document.getElementById('child1'));
  // console.log('flex: ' + style.flexGrow + ' ' + style.flexShrink + ' ' + style.flexBasis);
};
window.onbeforeunload =  function(e) {
  localStorage.setItem(styleName, editor.innerHTML);
};
