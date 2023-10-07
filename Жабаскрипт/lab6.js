
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

let blog = new Vue({
    el: ".vue-profile",
    data:{
        name: "ArtSolo",
        biography: "Преподаватель школы программирования Пиксель"
    },
    methods: {
        name_change: function(){
            this.name = prompt("новое имя");
        },
        bio_change: function(){
            this.biography = prompt("новое описание");
        }
    }
})

let time = new Date(2023, 10, 7, 19, 39, 30, 100);
let bloghistory = "\r\n";

let blog_wall = new Vue({
    el: ".vue-post",
    data:{
        blog: bloghistory
    },
    methods: {
        add_post: function(){
            bloghistory = (`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} – ${blog.name}(${blog.biography}) сказал(-а): ${prompt("новое сообщение")}`);
            this.blog = bloghistory;
            document.getElementById("wall").innerHTML += bloghistory + "<br>";
        }
    }
})

// import date from 'date-and-time';
// const date = require('date-and-time');
