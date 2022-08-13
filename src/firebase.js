import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {SET_USER, SET_LOADING_STATUS, GET_ARTICLES} from "./actions/actionType";
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDocs, getFirestore, } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { query, orderBy } from "firebase/firestore";  




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB68I8Aqh3b6yK4z02IVlJoKadwnAdUmZA",
  authDomain: "cult-db-3d18c.firebaseapp.com",
  projectId: "cult-db-3d18c",
  storageBucket: "cult-db-3d18c.appspot.com",
  messagingSenderId: "144116436131",
  appId: "1:144116436131:web:83f84a1f77eb6c5373c316",
  measurementId: "G-WRGBNNZW70"
};



 

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();


export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,

});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
})

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload:payload,
})

export  default function signInWithGoogle () {
  return (dispatch) => {
    signInWithPopup(auth,provider)
    .then((payload)=>{
      dispatch(setUser(payload.user));
    })
    .catch((error) => alert(error.message));
     
  }
}

export function getUserAuth() {
    return (dispatch) => {
      auth.onAuthStateChanged(async(user) => {
        if(user) {
          dispatch(setUser(user));
        }
      })
    }
} 

export function signOutAPI() {
  return(dispatch) => {
    auth.signOut().then(()=>{
      dispatch(setUser(null));
    }).catch((error)=>{
      console.log(error.message);
    });
  }
}



export function postArticleAPI(payload) {
  return (dispatch) =>{
    dispatch(setLoading(true));

    if(payload.image != "") {

      

      const storageRef = ref(storage, `images/${payload.image.name}`);
       const upload = uploadBytesResumable(storageRef, payload.image);
      

      upload.on(
        "state_changed",
         (snapshot) => {
     
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(`Progress: ${progress}%`);
            if(snapshot.state === 'RUNNING') {
              console.log(`Progress: ${progress}%`)
            }
      },(error) => console.log(error.code),
      async()=>{

           const downloadURL = await getDownloadURL(storageRef);


              const docRef = await addDoc(collection(db, "article"), {
                actor:{
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,  
                image: payload.user.photoURL,
                },

                video: payload.video,
                sharedImg: downloadURL,
                comments: "0",
                description: payload.description
              });
              dispatch(setLoading(false));
      }
      );
    } else if(payload.video){
          const docRef =  addDoc(collection(db, "article"), {
                actor:{
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,  
                image: payload.user.photoURL,
                },

                video: payload.video,
                sharedImg: "",
                comments: "0",
                description: payload.description
              });
              dispatch(setLoading(false));

    }
  }
}


export function getArticlesAPI(){
  return(dispatch) => {
    
    
    // collection(db,"article").orderBy("actor.date","desc").onSnapshot((snapshot)=>{
    //   payload = snapshot.docs.map((doc)=>doc.data());
    //   console.log(payload);
    // })

    const dataRef = collection(db,'article');
    const q = query(dataRef, orderBy("actor.date", "desc"));

    getDocs(q).then(response => {
      let payload = response.docs.map(doc => ({data: doc.data(), id: doc.id,}));
      
      dispatch(getArticles(payload)); 
    }).catch(error => console.log(error.message))

  }
} 