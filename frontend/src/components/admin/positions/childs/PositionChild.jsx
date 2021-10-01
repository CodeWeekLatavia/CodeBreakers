import React, { useEffect, useState } from 'react'
import DeleteIcon from "../../../../assets/svg/delete.svg"
import AcceptIcon from "../../../../assets/svg/check.svg"
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../../../slices/user/userSlice';
import { proffessionData } from '../../../../slices/proffessions/proffessionSlice';
import { deleteProffession, updateProffession } from '../../../../logic/admin/adminOptions';

function PositionChild({occupation}) {
    const [title, setTitle] = useState(occupation.title);
    const [selectedCategory, setSelectedCategory] = useState(occupation.category);
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");
    const [newPositionCategory, setNewPositionCategory] = useState(null);

    const proffessionInfo = useSelector(proffessionData);
    const userInfo = useSelector(userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedCategory){
            let result = proffessionInfo.categories.filter((category) => {
                return category.id === selectedCategory;
            });


            setSelectedCategoryTitle(result[0].title);
        }
    }, [selectedCategory, proffessionInfo.categories]);

    useEffect(() => {
        if(newPositionCategory){
            let result = proffessionInfo.categories.filter((category) => {
                return category.title === newPositionCategory;
            });
            
            if(result){
                setSelectedCategory(result[0].id);
            }
        }
    }, [newPositionCategory, proffessionInfo.categories]);

    const updateThisPosition = (e) => {
        e.preventDefault();
        if(title !== occupation.title || selectedCategory !== occupation.category){
            updateProffession(occupation.id, selectedCategory, title, userInfo.accessToken, dispatch)
        }
    }

    const deleteThisPosition = (e) => {
        e.preventDefault();
        deleteProffession(occupation.id, userInfo.accessToken, dispatch)
    }

    return (
        <li className="admin__screen__position__screen__position__list__child">
            <form className="admin__screen__position__screen__position__list__child__form">
                <div className="admin__screen__position__screen__position__list__child__form__selection">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="position title" />
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" onChange={(e) => setNewPositionCategory(e.target.value)}>
                        <option>{selectedCategoryTitle}</option>
                        {proffessionInfo.categories.map((category, i) => {
                            if(category.id !== selectedCategory){
                                return(
                                    <option key={i}>{category.title}</option>
                                )
                            }
                            return null;
                        })}
                    </select>
                </div>
                
                <div className="admin__screen__position__screen__category__list__child__form__icons">
                    <img 
                        className="admin__screen__position__screen__category__list__child__form__icons__delete" 
                        src={DeleteIcon} 
                        alt="delete" 
                        onClick={(e) => deleteThisPosition(e)}
                    />
                    <img 
                        className={title === occupation.title && selectedCategory === occupation.id ? "admin__screen__position__screen__category__list__child__form__icons__acceptdisabled" : "admin__screen__position__screen__category__list__child__form__icons__accept"} 
                        src={AcceptIcon} 
                        alt="accept" 
                        onClick={(e) => updateThisPosition(e)}
                    />
                </div>
            </form>
        </li>
    )
}

export default PositionChild
