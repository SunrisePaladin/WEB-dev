let v = new Vue({
    el: ".vue",
    data:{
        message: "Hello world"
    },
    methods:{
        change: function(){
            this.message = prompt("New msg");
        }
    }
})

let s = new Vue({
    el: ".sel",
    data:{
        prog: ""
    }
})