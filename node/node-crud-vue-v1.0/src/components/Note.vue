<template>
  <div class="hello" :key="id">
    <div class="errors" id="errors"></div>
    <h1>Witaj w Naszych Notatkach!</h1>
    <a v-if="$loggedIn">
      <!-- System information -->
      <div id="appConfig" class="diag">
        backend platform: {{this.hostname}}, {{this.arch}}, {{this.os}}<br>
        backend url: {{this.$backendUrl}}, {{this.backendOK}} <br>
        db url: {{this.dbUrl}}, {{this.dbStatus}} <br>
      </div>
    </a>
    <!-- Login -->
    <a v-if="!$loggedIn">
      <h2 style="padding-top: 40px; margin-bottom: 10px;">Login</h2>
        <div class="box" style="width: 400px; margin: auto;">
          <div class="title" id="login">
            <div style="width: 150px; float: left;">User: </div>
            <input type="text" id="username" name="username" maxlength="16" style="width: 150px">
          </div>
          <div class="title" id="password">
            <div style="width: 150px; float: left;">Password: </div>
            <input type="text" id="password" name="password" maxlength="16" style="width: 150px">
          </div>
          <div class="tools">
            <div class="newBtn genButton" id="loginBtn">Send</div>
          </div>
      </div>
    </a>

      <a v-if="$loggedIn">
      <!-- Dodawanie notatek -->
      <h2 style="padding-top: 40px; margin-bottom: 10px;">Nowa notatka</h2>
      <div class="box" style="height: 150px; width: 70%; height:80%; margin: auto;">
          <div class="tools">
            <div class="newBtn genButton" id="newBtn">Send</div>
          </div>
        <div class="title">
          Tytuł:
          <input type="text" id="newTitle" name="title" maxlength="30" style="width: 60%;">
        </div>
        <div class="content">
          <textarea id="newContent" name="content" maxlength="200" style="width: 80%; height: 80px; text-align: left; padding: 10px; padding-left: 24px;"></textarea>
        </div>
      </div>
      </a>

    <!-- Przeglądanie notatek -->
    <h2 style="padding-top: 40px; margin-bottom: 0px;">Nasze notatki</h2>
    <div class="center">
      <div class="package" v-for="item in notes" :key="item._id">
        <div class="box" style="float: left;">
          <a v-if="$loggedIn">
            <div class="tools">
              <div :id=item._id class="deleteBtn genButton">Delete</div>
            </div>
          </a>
          <div class="title">
            {{ item.title }}
            <div class="date">
              {{ item.updatedAt }}
            </div>
          </div>
          <div class="content">
          {{ item.content }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

// URL for backend
// those are the global variables for our app.
// -------------------
var myUrl = 'null'
// Data
var myData = {
  notes: null,
  id: 1,
  backendUrl: this.$backendUrl,
  dbStatus: null,
  dbUrl: null,
  hostname: null,
  os: null,
  arch: null,
  backendOK: 'disconnected'
}
var myVue = null
// Status Url
var myStatusUrl = null
var statusTimer = null
// Error timer
var errorTimer = null
// -------------------
// auth url
var myAuthUrl = null

function printErr (er) {
  // show red banned with error message, hide after 5 seconds
  console.log('et:', errorTimer)
  if (errorTimer !== null) {
    clearTimeout(errorTimer)
    errorTimer = null
  }
  console.log('Error: ', er)
  $('div#errors').html(er)
  $('div#errors').css('visibility', 'visible')
  errorTimer = setTimeout(() => {
    $('div#errors').css('visibility', 'hidden')
  }, 5000)
}

function updateStatus () {
  // update status of database connection
  // requires global var myData holding component data
  // requires global var myStatusUrl holding status url

  if (myStatusUrl !== null) {
    // no connection to backend - show error
    const restStatusTmr = setTimeout(() => {
      myData.backendOK = 'disconnected'
      myData.dbStatus = 'noBackend'
      printErr('Backend connection error!')
    }, 500)

    // fetch status data from backend
    fetch(myStatusUrl)
      .then(response => response.json())
      .then(data => {
        myData.backendOK = 'disconnected'
        if (data.hasOwnProperty('status')) myData.dbStatus = data.status
        if (data.hasOwnProperty('dbUrl')) myData.dbUrl = data.dbUrl
        if (data.hasOwnProperty('arch')) myData.arch = data.arch
        if (data.hasOwnProperty('hostname')) myData.hostname = data.hostname
        if (data.hasOwnProperty('os')) myData.os = data.os
        if (myData.dbStatus !== 'connected') printErr('Database connection error!')
        myData.backendOK = 'connected'
        clearTimeout(restStatusTmr)
      })
  }
}

function updateData () {
  // update data from rest source
  // requires global var myData holding component data
  // requires global var myUrl holding backend url
  if (myUrl !== null) {
    console.log('Fetch data from backend.')

    // fetch notes from backend
    fetch(myUrl)
      .then(response => response.json())
      .then(data => { myData.notes = data })
      .catch(error => console.error('Error: ', error))
  }
}

function deleteNoteFromEvent (event) {
  // This is delete action for note based on src div id.
  const noteId = event.srcElement.id
  var elem = this
  markClick(elem)

  // delete note based on it's ID
  $.ajax({
    type: 'DELETE',
    url: myUrl + '/' + noteId,
    success: function (response) {
      // ok, deleted.
      console.log(response)
      updateData()
    }
  })
}

function loginFromEvent (event) {
  // This is delete action for note based on src div id.
  var elem = this
  markClick(elem)
  var username = $('input#username').val()
  var password = $('input#password').val()
  console.log(event)
  console.log('user: ', username, ' pass: ', password)
  const auth = {
    username: username,
    password: password
  }
  $.ajax({
    type: 'POST',
    data: auth,
    url: `${myAuthUrl}authorize`,
    success: function (response) {
      // clear input
      console.log(response)
      if (response.code === 200) {
        markClick(elem)
        var sessionId = response.session
        console.log('Auth successfull. Session id:', sessionId)
        $('input#username').val('')
        $('input#password').val('')

        myVue.$cookies.set('sessionId', sessionId)
      } else {
        markError(elem)
        printErr('Login error, check username/password.')
      }
    },
    error: function (err) {
      markError(elem)
      console.log('Auth error: ', err)
    }

  })
}

function markClick (elem) {
  // mark item clicked, remove marking after 2 seconds
  elem.classList.add('clicked')
  setTimeout(function () {
    elem.classList.remove('clicked')
  }, 2000)
}

function markError (elem) {
  // mark item error, remove marking after 2 seconds
  elem.classList.add('error')
  setTimeout(function () {
    elem.classList.remove('error')
  }, 2000)
}

function addNoteFromEvent (event) {
  // This is add action for note based on src div id.

  // for action status we need ID of the button
  var elem = document.getElementById('newBtn')

  // those are the Id's of our input cell
  var noteText = $('textarea#newContent').val()
  var noteTitle = $('input#newTitle').val()

  // if anything is entered - just send it
  if ((noteText.length > 0) && (noteTitle.length > 0) && (myUrl !== null)) {
    // mark click status on button
    markClick(elem)

    // send data
    console.log(`New note: ${noteTitle} with text: ${noteText}`)
    var obj = {
      title: noteTitle,
      content: noteText
    }

    $.ajax({
      type: 'POST',
      data: obj,
      url: myUrl,
      success: function (response) {
        // clear input
        $('textarea#newContent').val('')
        $('input#newTitle').val('')
        // update notes
        updateData()
      },
      error: function () {
        markError(elem)
      }

    })
  } else {
    // no data entered, but button clicked
    markError(elem)
    printErr('Notatka nie moze być pusta!')
  }
}

// ------------------------------------------
// data object
export default {
  name: 'NotesApp',
  data () {
    return myData
  },
  created () {
    // initialize variables for functions
    // pass reference to external code
    myUrl = this.$backendUrl
    myStatusUrl = this.$backendStatusUrl
    myAuthUrl = this.$authUrl
    // myData = this
    myVue = this
    updateData()
    updateStatus()
  },
  mounted () {
    // init app buttons
    console.log('Init buttons...')
    $('#loginBtn').unbind('click')
    $('#loginBtn').bind('click', loginFromEvent)

    $('.deleteBtn').unbind('click')
    $('.deleteBtn').bind('click', deleteNoteFromEvent)

    $('#newBtn').unbind('click')
    $('#newBtn').bind('click', addNoteFromEvent)

    // $(document).on('click', '.deleteBtn', deleteNoteFromEvent)
    // $(document).on('click', '#newBtn', addNoteFromEvent)
    // $(document).on('click', '#loginBtn', loginFromEvent)
  }
}

// update db status
console.log('Start intervals.')
if (statusTimer !== null) {
  clearInterval(statusTimer)
}
statusTimer = setInterval(updateStatus, 1000)

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.package {
    display: inline-block;
    padding: 6px;
}

.box {
    color: #42b983;
    margin: 5px;
    min-height: 100px;
    width: 400px;
    margin: auto;
    background: #14915627;
    margin-bottom: 10px;
}
.title {
    color: #1a2721;
    text-align: left;
    font-size: large;
    font-style: italic;
    font-weight: 500;
    padding: 5px;
    text-transform: uppercase;
    border-bottom: #0b93104f;
    border-bottom-style: dotted;
    padding-bottom: 2px;
    margin-bottom: 5px;
    border-bottom-width: 1px;

}
.center {
  margin: auto;
  width: 85%;
  padding: 10px;
}
.tools {
  float: right;
  padding: 2px;
  color: #ff000099;
      font-style: italic;
}
.date {
     font-size: small;
         color: #3e3a3a59;
}

.genButton {
  padding: 3px;
  padding-right: 12px;
  padding-left: 12px;
}
.clicked {
    background-color: #cce6d3;
    color: green;
}
.error {
    background-color: #ecbd95;
    color: rgb(252, 5, 46);
}
input {
    background-color: #079b421c;
    border: 0px;
}
textarea {
    background-color: #079b421c;
    border: 0px;
}

.diag {
      color: gray;
    /* text-transform: capitalize; */
    font-size: small;
    font-variant: small-caps;
}

.errors {
  position: absolute;
    top: 0px;
    left: 0px;
    text-align: center;
    width: 100%;
    height: 50px;
    /* border: 1px red; */
    background-color: #ff000042;
    visibility: hidden;
}

</style>
