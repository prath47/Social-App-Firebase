import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { useUser } from "@clerk/clerk-react";
import { collection, addDoc, getFirestore, query, where, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import firebase from "firebase/compat/app";

export const FirebaseContext = createContext(null);

export const useFirbase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyBn9XDfgkluQkIHc3ZAYlfr2Ik4CCMZPqA",
  authDomain: "social-app-1a327.firebaseapp.com",
  projectId: "social-app-1a327",
  storageBucket: "social-app-1a327.appspot.com",
  messagingSenderId: "919514092455",
  appId: "1:919514092455:web:f9f0f131b83158405ddc82"
};

const firebaseDb = initializeApp(firebaseConfig);
const storage = getStorage(firebaseDb);
const firestore = getFirestore(firebaseDb);


export const FirebaseContextProvider = ({ children }) => {
  const { user } = useUser()
  const [imgLink, setImgLink] = useState('');
  const [allImages, setAllImages] = useState([])

  const getImgUrl = async (imgName) => {
    const q = query(collection(firestore, "images"), where("imgName", "==", imgName));
    const querySnapshot = await getDocs(q);
    const url = await getDownloadURL(ref(storage, querySnapshot.docs[0].data().imageURL))


    const imgRef = doc(firestore, 'images', querySnapshot.docs[0].id)
    const views = querySnapshot.docs[0].data().views + 1
    await updateDoc(imgRef, {
      views: views,
    })
    return { querySnapshot, url }
  }

  const getAllImages = async () => {
    const q = query(collection(firestore, "images"), where("userId", '==', user.id))
    const querySnapshot = await getDocs(q);
    const tempArray = new Array()
    querySnapshot?.forEach((docs) => {
      tempArray.push(docs.data())
      // console.log(docs.data())
    })
    setAllImages(tempArray)
    return tempArray
  }

  const uploadImage = async (img) => {
    if (!user) return;
    document.getElementById('uploading').classList.remove('hidden')
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${img.name}`)
    const imgUrl = await uploadBytes(imageRef, img)
    const url = await getDownloadURL(ref(storage, imgUrl.ref.fullPath))
    
    const imgName = `${Date.now()}-${img.name}`;
    const res = await addDoc(collection(firestore, `images`), {
      userId: user.id,
      userName: user.firstName,
      imageURL: imgUrl.ref.fullPath,
      imgName: imgName,
      views: 0,
      url: url
    })
    console.log(res.id)
    
    setImgLink(`http://localhost:5173/view/${imgName}`)
    console.log(imgLink)
    document.getElementById('uploading').classList.add('hidden')
  }

  useEffect(() => { }, [user, allImages])

  return <FirebaseContext.Provider value={{ uploadImage, imgLink, setImgLink, getImgUrl, getAllImages, allImages }}>{children}</FirebaseContext.Provider>;
};
