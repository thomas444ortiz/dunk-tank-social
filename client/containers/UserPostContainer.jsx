import React from 'react';
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux';
import { updateAllPosts, updateNeedsRerender, updateAddPosts, updatePage, updateIsLoading, 
  updateHasMore, updateSinglePost } from '../redux/slices/postSlice';
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@chakra-ui/react'

export default function UserPostContainer() {
  const store = useSelector((state) => state.post)
  const dispatch = useDispatch();
  const [ref, inView, entry] = useInView();

  const posts = [];

  // reset everything when switching between pages
  useEffect(()=>{
    dispatch(updateAllPosts({}))
    dispatch(updatePage(1));
    dispatch(updateIsLoading(false))
    dispatch(updateHasMore(true))
  },[])

  useEffect(() => {
    if (inView && !store.isLoading && store.hasMore) {
      dispatch(updateIsLoading(true)) 
      // send a post request
      fetch('/post/loadPostsByUser',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          page: store.page,
        })
      })
      .then((data)=> data.json())
      // then, update the posts object
      // then update the page number
      .then((data)=> {
        dispatch(updateHasMore(data.hasMore))
        dispatch(updateAddPosts(data.posts));
        dispatch(updatePage(store.page+1));
        dispatch(updateIsLoading(false))
        dispatch(updateNeedsRerender(false))
      })
    }
  },[inView])
  
  // a useEffect to be invoked whenever a post is edited
  useEffect(() => {
    if(store.needsRerender){
      // fetch the latest data for the post
      fetch('/post/getOnePost',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          postId: store.needsRerender,
        })
      })
      .then((data)=> data.json())
      // then, update the posts object
      // then update the page number
      .then((data)=> { 
        // now take the response and update the appropriate post
        dispatch(updateSinglePost({postId: store.needsRerender, data: data}))
        dispatch(updateNeedsRerender(false))
      })
    }
  }, [store.needsRerender])

  if (Object.keys(store.posts).length > 0){
    for(const postId in store.posts){
      posts.push(<Post key={store.posts[postId]._id} id={store.posts[postId]._id} 
        body={store.posts[postId].body} postedBy={store.posts[postId].username} timestamp={store.posts[postId].updatedAt} 
        userPost={store.posts[postId].userId} usernameExposed={store.posts[postId].usernameExposed}
        profilePicture={store.posts[postId].profilePicture}/>)
    }
  }

  return (
    <div className='user-post-inner'>
      {!store.isLoading && posts.length === 0 ? "No posts yet..." : posts}
      {store.isLoading ? <Spinner/> :<div ref={ref} ></div>}
      {!store.hasMore && posts.length ? <div>No more posts to show...</div>: null}
    </div>
  );
}