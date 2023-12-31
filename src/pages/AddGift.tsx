import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../Firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddGift = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const imageFile = e.target!.files[0]!;
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "tags") {
      setTags(e.target.value);
    }
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    try {
      const doc = await addDoc(collection(db, "gifts"), {
        creator: user.uid,
        username: user.displayName || "Anonymous",
        title,
        description,
        createdAt: Date.now(),
        tags: tags.split(","),
        count: 0,
      });

      if (file) {
        const imageRef = ref(storage, `gifts/${user.uid}/${doc.id}`);

        const result = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/gifts");
    }
  };
  return (
    <div className="w-full h-screen px-44 py-14 bg-purple-400">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl grid grid-cols-2 p-5 bg-white"
      >
        {image === null ? (
          <label className="w-full min-h-[550px] border-2 border-black rounded-xl border-dashed flex justify-center items-center">
            <input type="file" className="hidden" onChange={onChangeImage} />
            <svg
              width={100}
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              ></path>
            </svg>
          </label>
        ) : (
          <div className="w-full min-h-[550px] rounded-xl flex justify-center items-center">
            <img
              src={image.toString()}
              alt="image_preview"
              width={500}
              height={500}
              className="w-full h-full max-h-[500px] rounded-xl object-cover overflow-hidden border p-1"
            />
          </div>
        )}

        <div className="w-full h-full flex flex-col justify-start items-start px-10">
          <h1 className="text-xl font-medium">상품명</h1>
          <input
            onChange={onChange}
            value={title}
            name="title"
            className="w-full outline-none px-4 py-3 rounded-xl mt-3 bg-gray-200"
          />

          <h1 className="mt-4 mb-3 text-xl font-medium">상세 설명</h1>
          <textarea
            onChange={onChangeTextArea}
            value={description}
            name="description"
            rows={12}
            className="w-full resize-none rounded-xl outline-none px-5 py-3 bg-gray-200"
          />
          <h1 className="mt-4 mb-3 text-xl font-medium">테그</h1>
          <input
            onChange={onChange}
            value={tags}
            name="tags"
            className="w-full outline-none px-4 py-3 rounded-xl mt-3 bg-gray-200"
          />
          <input
            type="submit"
            value="추가하기"
            className="px-3 py-1.5 bg-black text-white rounded-md mt-4 place-items-end"
          />
        </div>
      </form>
    </div>
  );
};

export default AddGift;
