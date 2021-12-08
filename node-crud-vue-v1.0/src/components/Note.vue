<template>
  <div class="hello" :key="id">
    <h1>Witaj w Naszych Notatkach!</h1>
      <div id="appConfig">
        rest url: {{this.$backendUrl}}<br>
        db url: {{this.dbUrl}} <br>
        db status: {{this.dbStatus}}<br>
      </div>
    <h2>Nowa notatka</h2>

    <div class="box" style="height: 150px; width: 60%">
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
    <h2>Nasze notatki</h2>
    <div class="center">
      <div class="box" v-for="item in notes" :key="item._id">
        <div class="tools">
          <div :id=item._id class="deleteBtn genButton">Delete</div>
        </div>
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
</template>
<script>

// URL for backend
// those are the global variables for our app.
// -------------------
var myUrl = null
// Data
var myData = null
// Status Url
var myStatusUrl = null
// -------------------

function updateStatus () {
  // update status of database connection
  // requires global var myData holding component data
  // requires global var myStatusUrl holding status url

  if (myStatusUrl !== null) {
    fetch(myStatusUrl)
      .then(response => response.json())
      .then(data => {
        myData.dbStatus = data.status
        myData.dbUrl = data.dbUrl
      })
  }
}

function updateData () {
  // update data from rest source
  // requires global var myData holding component data
  // requires global var myUrl holding backend url
  if (myUrl !== null) {
    console.log('Fetch data from backend.')
    fetch(myUrl)
      .then(response => response.json())
      .then(data => {
        myData.notes = data
      })
  }
}

function deleteNoteFromEvent (event) {
  // This is delete action for note based on src div id.

  const noteId = event.srcElement.id
  var elem = this
  markClick(elem)

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

function markClick (elem) {
  elem.classList.add('clicked')
  setTimeout(function () {
    elem.classList.remove('clicked')
  }, 2000)
}

function markError (elem) {
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
  }
}

export default {
  name: 'NotesApp',
  data () {
    return {
      notes: null,
      id: 1,
      backendUrl: this.$backendUrl,
      dbStatus: null,
      dbUrl: null
    }
  },
  created () {
    // initialize variables for functions
    myUrl = this.$backendUrl
    myStatusUrl = this.$backendStatusUrl
    myData = this
    updateData()
    updateStatus()
  }
}

// init app buttons
$(document).on('click', '.deleteBtn', deleteNoteFromEvent)
$(document).on('click', '#newBtn', addNoteFromEvent)

// update db status
setInterval(updateStatus, 1000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.box {
    color: #42b983;
    margin: 5px;
    min-height: 100px;
    width: 80%;
    margin: auto;
    /*float: left;*/
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
  width: 80%;
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

</style>
