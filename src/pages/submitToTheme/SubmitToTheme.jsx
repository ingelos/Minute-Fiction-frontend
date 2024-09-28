import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import {useParams} from "react-router-dom";
import Input from "../../components/input/Input.jsx";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";


function SubmitToTheme() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const {themeId, themeName} = useParams();
    const controller = new AbortController();


    async function handleFormSubmit(data) {
        setError(false);

        try {
            const {data} = await axios.post(`http://localhost:8080/stories/submit/${themeId}`, {
                title: data.title,
                content: data.content,
                signal: controller.signal,
            });
            console.log('Form data:', data);

        } catch (error) {
                console.error('Something went wrong, please try again.');
                setError(true);
            }
        }




    return (
        <section className='submit-section outer-content-container'>
            <div className='submit-section inner-content-container'>
                <div className='main-container'>
                    <div className="featured-section">
                        {error && <p>Error...</p>}
                        <div className="open-themes-submit">
                            <h3 className="theme-name">Theme: {themeName}</h3>
                            <form className='subit-form' onSubmit={handleSubmit(handleFormSubmit)}>
                                <Input
                                    inputType='text'
                                    inputName='title'
                                    inputId='title-field'
                                    inputLabel='Title:'
                                    validationRules={{
                                        required: 'Title is required'
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                <Input
                                    inputType='text'
                                    inputName='content'
                                    inputId='content-field'
                                    inputLabel='Content:'
                                    validationRules={{
                                        required: 'Content is required',
                                        validate: (value) => {
                                            const wordCount = value.trim().split(/\s+/).length;
                                            return wordCount <= 100 || `Content exceeds the max word limit of a 100 words.`
                                        },
                                    }}
                                    register={register}
                                    errors={errors}
                                />
                                <button
                                    type='submit'
                                    className='submit-story-button'
                                >
                                    Submit
                                </button>
                            </form>

                        </div>
                    </div>
                    <AsideMenu/>
                </div>
            </div>
        </section>
    )
}

export default SubmitToTheme;