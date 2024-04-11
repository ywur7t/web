function duplicate(id){





    let id_element = document.getElementById(id);
    let body = document.getElementsByTagName('body')

    while(id_element.parentNode.tagName.toLowerCase() != 'html'){
        let newElement = document.createElement(id_element.parentNode.firstElementChild.tagName)
        newElement.textContent = 'Новый элемент'
        id_element.parentNode.appendChild(newElement)
        id_element = id_element.parentNode
    }




    var htmlCode = document.documentElement.outerHTML
    let index = htmlCode.indexOf('<!-- Code injected by live-server -->')
    let end = htmlCode.indexOf('<script src="script.js"></script>')
    var htmlCodeElement = document.createElement('pre')
    htmlCodeElement.textContent = htmlCode.replace(htmlCode.substring(index,end+'<script src="script.js"></script>'.length),'').replace(htmlCode.substring(htmlCode.indexOf('<meta'),htmlCode.indexOf('</head')),'')
    document.body.appendChild(htmlCodeElement)
}







duplicate('test')