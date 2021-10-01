import React, { useState } from 'react'
import DeleteIcon from "../../../../assets/svg/delete.svg"
import AcceptIcon from "../../../../assets/svg/check.svg"
import { useSelector } from 'react-redux';
import { userData } from './../../../../slices/user/userSlice';
import { deleteCategory, updateCategory } from '../../../../logic/admin/adminOptions';
import { useDispatch } from 'react-redux';

function CategoryChild({proffession}) {
    const [title, setTitle] = useState(proffession.title);
    const userInfo = useSelector(userData);
    const dispatch = useDispatch();

    const updateThisCategory = (e) => {
        e.preventDefault();
        if(title !== proffession.title){
            updateCategory(proffession.id, title, userInfo.accessToken, dispatch);
        }
    }

    const deleteThisCategory = (e) => {
        e.preventDefault();
        deleteCategory(proffession.id, userInfo.accessToken, dispatch);
    }

    return (
        <li className="admin__screen__position__screen__category__list__child">
            <form className="admin__screen__position__screen__category__list__child__form">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="position title" />
                <div className="admin__screen__position__screen__category__list__child__form__icons">
                    <img 
                        className="admin__screen__position__screen__category__list__child__form__icons__delete" 
                        src={DeleteIcon} 
                        alt="delete" 
                        onClick={(e) => deleteThisCategory(e)}
                    />
                    <img 
                        className= {title === proffession.title ? "admin__screen__position__screen__category__list__child__form__icons__acceptdisabled" : "admin__screen__position__screen__category__list__child__form__icons__accept"} 
                        src={AcceptIcon} 
                        alt="accept" 
                        onClick={(e) => updateThisCategory(e)}
                    />
                </div>
            </form>
        </li>
    )
}

export default CategoryChild
