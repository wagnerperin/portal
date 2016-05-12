colorButton = document.getElementById("demo2");
colorButton.addEventListener("input", function() {
  myDiagram.startTransaction("change color");
  var it = myDiagram.selection.iterator;
  while (it.next()) {
    var node = it.value;
    var shape = node.findObject("SHAPE");
    if (shape !== null) {
      shape.fill = colorButton.value;
    }
  }
  myDiagram.commitTransaction("change color");
});

var boldButton = document.getElementById("bold");
boldButton.addEventListener("click", function() {
  myDiagram.startTransaction("change font style");
  var it = myDiagram.selection.iterator;
  var equalStylesVar = equalStyles('bold',myDiagram.selection.iterator)
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {
      textBlock.font = setFontStyle('bold',textBlock.font,equalStylesVar)
    }
  }
  myDiagram.commitTransaction("change font style");
});

var italicButton = document.getElementById("italic");
italicButton.addEventListener("click", function() {
  myDiagram.startTransaction("change font style");
  var it = myDiagram.selection.iterator;
  var equalStylesVar = equalStyles('italic',myDiagram.selection.iterator)
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {
      textBlock.font = setFontStyle('italic',textBlock.font,equalStylesVar)
    }
  }
  myDiagram.commitTransaction("change font style");
});

var underlineButton = document.getElementById("underline");
underlineButton.addEventListener("click", function() {
  myDiagram.startTransaction("change font style");
  var it = myDiagram.selection.iterator;
  var equalStylesVar = equalStyles('underline',myDiagram.selection.iterator)
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {
      textBlock.isUnderline = setFontStyle('underline',textBlock.isUnderline,equalStylesVar)
    }
  }
  myDiagram.commitTransaction("change font style");
});

myDiagram.addDiagramListener("ChangedSelection", function() {

  var it = myDiagram.selection.iterator;
  while (it.next()) {
    var node = it.value
    var shape = node.findObject("SHAPE")
    var fillButton = document.getElementById("fill-icon")
    console.log(shape.fill)
    fillButton.style = `background-color: ${shape.fill};`
  }

  });

function equalStyles(style,selectedModels){

  var it = selectedModels.iterator;
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {

      if (style === 'underline') {
        if (textBlock.isUnderline === null || !textBlock.isUnderline) {
          return false
        }
      } else {
        if (textBlock.font.search(style) == -1) {
          return false
        }
      }
    }
  }
  return true
}


function trimFont(font){
  var count = 1
  var arrayOfStrings = font.split(',')
  font = ''

  arrayOfStrings.forEach(
    function(string){
      if(count === arrayOfStrings.length){
      font += string.trim()

    } else {

      font += `${string.trim()}, `

    }

    count++

  })

  return font
}

function setFontStyle(style, font, equalStyles){

  var newFont = font

  switch (style) {

    case 'bold':
      if (equalStyles) {

        newFont = font.replace(/bold/g, '');

      } else if (font.search('bold') == -1){

        newFont = `bold ${font}`

      }
      newFont = trimFont(newFont)
      break;
      case 'italic':
        if (equalStyles) {

          newFont = font.replace('italic ', '');

        } else if (font.search('italic') == -1){

          newFont = `italic ${font}`

        }

        newFont = trimFont(newFont)
        break;
        case 'underline':
          if (equalStyles) {

            newFont = false;

          } else if (font === null || !font){

            newFont = true

          }
          break;
    default:

  }


  return newFont
}


$(function(){

    var blabla = $('#blabla');
    blabla.colorpickerplus();
    blabla.on('changeColor', function(e,color){
  if(color==null) {
    //when select transparent color
    $('.color-fill-icon', $(this)).addClass('colorpicker-color');
  } else {
    $('.color-fill-icon', $(this)).removeClass('colorpicker-color');
        $('.color-fill-icon', $(this)).css('background-color', color);

        colorButton.value = color
        colorButton.dispatchEvent(new Event('input'));
  }
    });

});
