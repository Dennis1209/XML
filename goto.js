// the log in part

function clear1()
{
    document.getElementById("user").value = "";
    document.getElementById("password").value = "";
}

function LogIn()
{
    // request
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function()
    {
        log_in(this);
    }
    xhttp.open("GET", "log.xml");
    xhttp.send();
}
function log_in(xml)
{
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("person");
    var n = document.getElementById("user").value;
    var p = document.getElementById("password").value;
    var i = 0;
    // go through all <person>
    for (i = 0; i <x.length; i++)
    { 
      // check user name
      if( x[i].getElementsByTagName("user")[0].childNodes[0].nodeValue == n )
      {
          // check password
          if( x[i].getElementsByTagName("password")[0].childNodes[0].nodeValue == p )
          {
              // close the log in block
              document.getElementById('in').style.display='none';
              // show the log out block
              document.getElementById('out').style.display='block';
              // display user name
              document.getElementById("output").textContent = p;
          }
          else
          {
              alert("Wrong Password");
          }
      }
    }
    if( i == x.length)
    {
        alert("No this person");
    }
}

function LogOut()
{
    // close log out block
    document.getElementById('out').style.display='none';
    // show the log i block
    document.getElementById('in').style.display='block';
    // clear the user name in log out block
    document.getElementById("output").textContent = "";
}

function SignIn()
{
    // request
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function()
    {
        sign_in(this);
    }
    xhttp.open("GET", "log.xml");
    xhttp.send();
}

function sign_in(xml)
{
    var xmlDoc = xml.responseXML;

    var name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var num = xmlDoc.length;
    // num shows the last index after adding new <person>
    
    // set <person> node
    var newElement = xmlDoc.createElement("person");
    var x = xmlDoc.getElementsByTagName("root")[0];
    x.appendChild(newElement);
    // set <person> attr
    var y = xmlDoc.getElementsByTagName("person");
    var y_len = y.length;
    // set the person id every time
    // it dosen't really matter, cause only sever know the id
    for(let i = 0; i < y_len; i++)
    {
        newAtt = xmlDoc.createAttribute("id");
        newAtt.value = "num";
        x[i].setAttributeNode(newAtt);
    }
    // set user
    newEle = xmlDoc.createElement("user");
    newText = xmlDoc.createTextNode(name);
    newEle.appendChild(newText);
    x = xmlDoc.getElementsByTagName("person")[num];
    x.appendChild(newEle);

    // set password
    newEle = xmlDoc.createElement("password");
    newText = xmlDoc.createTextNode(password);
    newEle.appendChild(newText);
    x = xmlDoc.getElementsByTagName("person")[num];
    x.appendChild(newEle);

}

// the set book part

function clear_d()
{
    document.getElementById("ID_del").value = "";
}

function Delete()
{
    // request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            del(this);
        }
    };
    // need 'true' if we're changing XML File
    xhttp.open("GET", "book.xml", true);
    xhttp.send();;
}

function del(xml)
{
    var get_id = document.getElementById("ID_del").value;

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book");

    // find node
    for(let i = 0; i < x.lenght; i++)
    {
        if(x[i].getAttribute('id') == get_id )
        // because the id is the only value
        {
            // delete it
            x = x[i];
            x.parentNode.removeChild(x);
        }
    }
}

function clear_a()
{
    document.getElementById("ID").value = "";
    document.getElementById("category").value = "";
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
}

function Add()
{
    // request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            add(this);
        }
    };
    xhttp.open("GET", "book.xml", true);
    xhttp.send();;
}

function add(xml)
{
    var xmlDoc = xml.responseXML;

    // get value from <input>
    var id = document.getElementById("ID").value;
    var cat = document.getElementById("category").value;
    var author = document.getElementById("author").value;
    var title = document.getElementById("title").value;
    var price = document.getElementById("price").value;
    var num = xmlDoc.length;
    
    // set <book> node
    var newElement = xmlDoc.createElement("book");
    var x = xmlDoc.getElementsByTagName("root")[0];
    x.appendChild(newElement);

    // set <book> attr id
    var y = xmlDoc.getElementsByTagName("book");
    var y_len = y.length;

    newAtt = xmlDoc.createAttribute("id");
    newAtt.value = id;
    x[y_len-1].setAttributeNode(newAtt);

    // set <book> attr cat
    var y = xmlDoc.getElementsByTagName("book");
    var y_len = y.length;
    
    newAtt = xmlDoc.createAttribute("category");
    newAtt.value = cat;
    x[y_len-1].setAttributeNode(newAtt);

    // set title
    newEle = xmlDoc.createElement("title");
    newText = xmlDoc.createTextNode(title);
    newEle.appendChild(newText);
    x = xmlDoc.getElementsByTagName("book")[num];
    x.appendChild(newEle);

    // set author
    newEle = xmlDoc.createElement("author");
    newText = xmlDoc.createTextNode(author);
    newEle.appendChild(newText);
    x = xmlDoc.getElementsByTagName("book")[num];
    x.appendChild(newEle);

    // set price
    newEle = xmlDoc.createElement("price");
    newText = xmlDoc.createTextNode(price);
    newEle.appendChild(newText);
    x = xmlDoc.getElementsByTagName("book")[num];
    x.appendChild(newEle);
}

// search book

function clear_all()
{
    document.getElementById("sID").value = "";
    document.getElementById("scategory").value = "";
    document.getElementById("sauthor").value = "";
    document.getElementById("stitle").value = "";
    document.getElementById("sprice").value = "";
}

function Search(op)
{
    // request
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function()
    {
        document.getElementById('big_table').style.display='block';
        switch(op)
        {
            case 1:
                search1(this);// id
                break;
            case 2:
                search2(this);// title
                break;
            case 3:
                search3(this);// category
                break;
            case 4:
                search4(this);// author
                break;
            case 5:
                search5(this);// price
                break;
            default:
                break;
        }
    }
    xhttp.open("GET", "book.xml");
    xhttp.send();
}

function search1(xml)
{
    var get_id = document.getElementById("sID").value;

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book");

    var txt = "";

    // find node
    for(let i = 0; i < x.lenght; i++)
    {
        if(x[i].getAttribute('id') == get_id )
        // because the id is the only value
        {
            txt  = "<td>" + x[i].getAttribute('id') + "</td>" ;
            txt  = "<td>" + x[i].getAttribute('category') + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("auther") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("title") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("price") + "</td>" ;
            txt += "</tr><tr>" ;
            document.getElementById('table').innerHTML = txt;
        }
    }
}
function search2(xml)
{
    var get = document.getElementById("stitle").value;

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book");

    var txt = "";

    // find node
    for(let i = 0; i < x.lenght; i++)
    {
        if(x[i].getElementsByTagName("title") == get )
        // because the id is the only value
        {
            txt  = "<td>" + x[i].getAttribute('id') + "</td>" ;
            txt  = "<td>" + x[i].getAttribute('category') + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("auther") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("title") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("price") + "</td>" + "</tr><tr>";
            document.getElementById('table').innerHTML = txt;
        }
    }
}

function search3(xml)
{
    var get = document.getElementById("scategory").value;

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book");

    var txt = "";

    // find node
    for(let i = 0; i < x.lenght; i++)
    {
        if(x[i].getAttribute('category') == get )
        // because the id is the only value
        {
            txt  = "<td>" + x[i].getAttribute('id') + "</td>" ;
            txt  = "<td>" + x[i].getAttribute('category') + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("auther") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("title") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("price") + "</td>" + "</tr><tr>" ;
            document.getElementById('table').innerHTML = txt;
        }
    }
}
function search4(xml)
{
    var get = document.getElementById("sauther").value;

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book");

    var txt = "";

    // find node
    for(let i = 0; i < x.lenght; i++)
    {
        if(x[i].getElementsByTagName("auther") == get )
        // because the id is the only value
        {
            txt  = "<td>" + x[i].getAttribute('id') + "</td>" ;
            txt  = "<td>" + x[i].getAttribute('category') + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("auther") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("title") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("price") + "</td>" + "</tr><tr>" ;
            document.getElementById('table').innerHTML = txt;
        }
    }
}
function search5(xml)
{
    var get = document.getElementById("sprice").value;

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book");

    var txt = "";

    // find node
    for(let i = 0; i < x.lenght; i++)
    {
        if(x[i].getElementsByTagName("price") == get )
        // because the id is the only value
        {
            txt  = "<td>" + x[i].getAttribute('id') + "</td>" ;
            txt  = "<td>" + x[i].getAttribute('category') + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("auther") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("title") + "</td>" ;
            txt += "<td>" + x[i].getElementsByTagName("price") + "</td>" + "</tr><tr>" ;
            document.getElementById('table').innerHTML = txt;
        }
    }
}

/////////////////////////////


function dynamic()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            del_ex(this);
            add_ex(this);
            replace_ex(this);
        }
    };
    xhttp.open("GET", "book.xml", true);
    xhttp.send();
}

function replace_ex(xml)
{
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
    x.nodeValue = "changed form";
}

function add_ex(xml)
{
    var xmlDoc = xml.responseXML;
    var newElement = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("book")[0];
    x.appendChild(newElement);
}

function del_ex(xml)
{
    var xmlDoc = xml.responseXML;
    var root = xmlDoc.documentElement;
    var currNode = root.childNodes[1];

    removedNode = currNode.removeChild(currNode.currNodes[1]);
}

function fixed()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function()
    {
        myFunction(this);
    }
    xhttp.open("GET", "cd_catalog.xml");
    xhttp.send();
}

function myFunction(xml) {
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("CD");
    let table="<tr><th>Artist</th><th>Title</th></tr>";
    for (let i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
      x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
      "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}