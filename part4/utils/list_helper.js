const dummy=(blogs)=>{
return 1;
}


const totalLikes=(blogs)=>{
    const total=blogs.reduce((sum,item)=>{
        return sum+item.likes
    },0)
    return total
}

const favoriteBlog=(blogs)=>{
    let obj={
        title:blogs[0].title,
        author:blogs[0].author,
        likes:blogs[0].likes
    }
    blogs.forEach((blog)=>{
        if(obj.likes<blog.likes){
            obj.likes=blog.likes
            obj.author=blog.author
            obj.title=blog.title
        }
    })
    return obj
}

const mostBlogs=(blogs)=>{
 const count={}
 let maxCount=0;
 let author="Michael Chan"
 for(let blog of blogs){
    count[blog.author]=count[blog.author]?count[blog.author]+1:1;
    if(count[blog.author]>=maxCount){
        maxCount=count[blog.author]
        author=blog.author
    }
 }
 return {author:author,
count:maxCount}   
}

const mostLikes=(blogs)=>{
const count={}
let maxLikes=0;
let author=""
for(let blog of blogs){
    count[blog.author]=count[blog.author]?count[blog.author]+blog.likes:blog.likes
    if(count[blog.author]>=maxLikes){
        maxLikes=count[blog.author]
        author=blog.author
    }
}
return { author:author,
likes:maxLikes}
}


module.exports={dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes}