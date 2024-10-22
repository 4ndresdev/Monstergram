import { useContext, useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import PreviewPost from "../components/PreviewPost";
import useBeforeUnload from "../hooks/useBeforeUnload";
import useCloudinary from "../hooks/useCloudinary";
import useGenerate from "../hooks/useGenerate";
import GenerateForm from "../components/GenerateForm";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Generate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [wasGenerated, setWasGenerated] = useState(false);
  const { user } = useContext(AuthContext);
  const { transformAspectRatio } = useCloudinary();
  const { createPost } = useGenerate();

  const postButtonRef = useRef(null);

  useBeforeUnload(fileSelected);

  const handleReset = () => {
    setFileSelected({});
    setPreviewImage(null);
    postButtonRef.current.disable = false;
  };

  const handleBack = () => {
    if (previewImage) {
      const confirm = window.confirm(
        "Are you sure you want to leave? Your image will be lost."
      );
      if (confirm) {
        handleReset();
        navigate("/home");
      }
    } else {
      navigate("/home");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    postButtonRef.current.disable = true;
    const { public_id, secure_url } = fileSelected;
    const dataPost = {
      prompt: prompt,
      transformed_image_url: previewImage,
      public_id,
      secure_url,
      userId: user.uid,
      timestamp: new Date().toISOString(),
      likes: {},
    };

    try {
      await createPost(dataPost);
      toast.success("Post created successfully!");
      navigate("/home");
    } catch {
      toast.error("Ups, something went wrong. Please try again.");
    } finally {
      handleReset();
      setLoading(false);
    }
  };

  useEffect(() => {
    const processImage = async () => {
      if (!fileSelected?.public_id) return;

      try {
        setProcessing(true);
        setPreviewImage(fileSelected.secure_url);

        const secure_url = await transformAspectRatio(fileSelected.public_id);
        setPreviewImage(secure_url);
      } catch (error) {
        toast.error(error.message);
        handleReset();
      } finally {
        setProcessing(false);
      }
    };

    processImage();
  }, [fileSelected, transformAspectRatio]);

  const handleInspireMe = () => {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const apiKey = import.meta.env.VITE_GROQ_CLOUD_API_KEY; // Sustituye esto por tu API Key

    const requestData = {
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente creativo que ayuda a los usuarios a transformar imágenes o generar contenido con temática de Halloween. Siempre que el usuario mencione Halloween, debes generar una descripción o prompt que contenga elementos típicos de Halloween, tales como calabazas, fantasmas, niebla, escenarios oscuros, criaturas terroríficas, o ambientes espeluznantes. Asegúrate de que las respuestas incluyan detalles visuales que evoquen un sentimiento de misterio, terror o suspenso. recuerda que tiene que ser algo muy breve de menos de 30 palabras ademas, no hagas preguntas",
        },
        {
          role: "user",
          content: "Halloween",
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        const prompt = data.choices[0].message.content.replaceAll('"', "");
        setPrompt(prompt);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGenerate = async () => {
    setProcessing(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: previewImage,
        prompt: prompt,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://monstergram-production.up.railway.app/process-image",
        requestOptions
      );
      const data = await response.json();
      setWasGenerated(true);
      setPreviewImage(data.output[1]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-12">
      <div className="left w-full col-span-12 md:col-span-4 xl:col-span-3 p-5">
        <Button
          isIconOnly
          color="danger"
          variant="shadow"
          aria-label="Back to home"
          onClick={handleBack}
        >
          <ArrowLeft />
        </Button>
        <GenerateForm
          setPrompt={setPrompt}
          prompt={prompt}
          previewImage={previewImage}
          handleInspireMe={handleInspireMe}
          handleGenerate={handleGenerate}
          processing={processing}
        />
      </div>
      <div className="inset-0 h-full w-full flex justify-center items-center right col-span-12 md:col-span-8 xl:col-span-9 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {previewImage ? (
          <PreviewPost
            previewImage={previewImage}
            processing={processing}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            postButtonRef={postButtonRef}
            loading={loading}
            wasGenerated={wasGenerated}
          />
        ) : (
          <FileUpload setFileSelected={setFileSelected} />
        )}
      </div>
    </div>
  );
};

export default Generate;
