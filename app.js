// Get a reference to the database service
const database = firebase.database();
const messageRef = database.ref("message");

new Vue({
    el:"#comment",
    data:{
        messageText: '',//'Klk Jean',
        messages:[],
        name: '',
        editText:null
    },
    methods:{
        storeMessage:function(){
            messageRef.push({text:this.messageText,name:this.name})
            this.messageText=''
            this.name = ''
            //console.log(this.messages);
        },
        deleteMessage:function(message){
            messageRef.child(message.id).remove()
            
        },
        editMessage:function(message){
            this.editText = message
            this.messageText = messages.text
        },
        cancelMessage:function(){
            this.editText = null
            this.messageText= ''
        },
        updateMessage:function(){
            messageRef.child(this.editText.id).update({text:this.messageText})
            this.cancelMessage()
        }

    },
    created(){
        
        messageRef.on('child_added',snapshot=>{
            this.messages.push({...snapshot.val(),id:snapshot.key})
            //console.log(snapshot.key);
        })
        messageRef.on('child_removed',snapshot=>{
            const deleteText=this.messages.find(message=>message.id == snapshot.key)
            const index=this.messages.indexOf(deleteText)
            this.messages.splice(index,1)
        })
        messageRef.on('child_changed',snapshot=>{
            const updateText = this.messages.find(message=>message.id == snapshot.key)
            updateText.text = snapshot.val().text 

        })

    }

})