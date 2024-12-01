import express from "express";
import bodyParser from "body-parser"; 


const app = express(); 
const port = 3000; 

app.set('view engine', 'ejs');

const posts = [
  { id:1 , title: 'Post 0', content: 'This is just a sample post' }
];


app.use(express.static("public")); 

app.use(bodyParser.urlencoded({extended:true}));   // . This allows you to parse data sent from HTML forms.


app.get('/', (req, res) => {

  res.render('index', { title: 'Home', posts });

})

app.get('/post', (req, res) => {

  res.render('post', { title: 'Home', posts });

})

app.post('/new-post', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };  //  A unique ID to each new post using Date.now() when creating a new post.
  posts.push(newPost);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.render('edit', { title: 'Edit Post', post });
  } else {
    res.redirect('/');
  }
});

app.post('/update/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
  }

 
  res.redirect('/');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})