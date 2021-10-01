import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { proffessionData } from '../../../slices/proffessions/proffessionSlice';
import CategoryChild from './childs/CategoryChild';
import PositionChild from './childs/PositionChild';
import { userData } from './../../../slices/user/userSlice';
import AddIcon from "../../../assets/svg/plus.svg"
import { newCategory, newProffession } from '../../../logic/admin/adminOptions';
import { useDispatch } from 'react-redux';

function AdminPositionScreen() {
    const [addOpened, setAddOpened] = useState(false);
    const [addPositionOpened, setAddPositionOpened] = useState(false);
    const [newCategoryTitle, setNewCategoryTitle] = useState("");
    const [newPositionTitle, setNewPositionTitle] = useState("");
    const [newPositionCategoryID, setNewPositionCategoryID] = useState(null);
    const [newPositionCategory, setNewPositionCategory] = useState(null);

    const userInfo = useSelector(userData);
    const proffessionInfo = useSelector(proffessionData);
    const dispatch = useDispatch();

    useEffect(() => {
        if(newPositionCategory){
            let result = proffessionInfo.categories.filter((category) => {
                return category.title === newPositionCategory;
            });
            
            if(result){
                setNewPositionCategoryID(result[0].id);
            }
        }
    }, [newPositionCategory, proffessionInfo.categories]);

    const createNewCategory = (e) => {
        e.preventDefault();
        if(newCategoryTitle !== ""){
            newCategory(newCategoryTitle, userInfo.accessToken, dispatch);
        }
        setNewCategoryTitle("");
    }

    const createNewPosition = (e) => {
        e.preventDefault();

        if(newPositionCategoryID && newPositionTitle !== ""){
            newProffession(newPositionCategoryID, newPositionTitle, userInfo.accessToken, dispatch);
            setNewPositionCategoryID(null);
            setNewPositionCategory(null);
            setNewPositionTitle("");
        }
    }

    return (
        <div className="admin__screen__position__screen">
            <ul className="admin__screen__position__screen__category__list">
                <li className="admin__screen__position__screen__category__list__header">
                    <p>Categories</p>
                </li>
                <li className="admin__screen__position__screen__category__list__add">
                    <div 
                        className="admin__screen__position__screen__category__list__add__button"
                        onClick={() => setAddOpened(!addOpened)}
                    ></div>
                    <p>Add new category</p>
                    
                    <img 
                        src={AddIcon} 
                        alt="add" 
                    />

                    {addOpened && (
                        <form className="admin__screen__position__screen__category__list__add__opener">
                            <div className="admin__label__input__container">
                                <label htmlFor="title">Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    placeholder="title"
                                    value={newCategoryTitle}
                                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                                />
                            </div>
                            <button type="submit" onClick={(e) => createNewCategory(e)}>Izveidot</button>
                        </form>
                    )}
                </li>
                {proffessionInfo.categories.map((proffession, i) => (
                    <CategoryChild 
                        key={i}
                        proffession={proffession}
                    />
                ))}
            </ul>
            <ul className="admin__screen__position__screen__position__list">
                <li className="admin__screen__position__screen__position__list__header">
                    <p>Positions</p>
                </li>
                <li className="admin__screen__position__screen__position__list__add">
                    <div 
                        className="admin__screen__position__screen__position__list__add__button"
                        onClick={() => setAddPositionOpened(!addPositionOpened)}
                    ></div>
                    <p>Add new position</p>
                    
                    <img 
                        src={AddIcon} 
                        alt="add" 
                    />

                    {addPositionOpened && (
                        <form className="admin__screen__position__screen__position__list__add__opener">
                            <div className="admin__label__input__container">
                                <label htmlFor="title">Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    placeholder="title"
                                    value={newPositionTitle}
                                    onChange={(e) => setNewPositionTitle(e.target.value)}
                                />
                            </div>
                            <div className="admin__label__input__container">
                                <label htmlFor="category">category</label>
                                <select 
                                    name="category" 
                                    id="category"
                                    onChange={(e) => setNewPositionCategory(e.target.value)}
                                >
                                    <option>choose category</option>
                                    {proffessionInfo.categories.map((option, i) => (
                                        <option key={i}>{option.title}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" onClick={(e) => createNewPosition(e)}>Izveidot</button>
                        </form>
                    )}
                </li>
                {proffessionInfo.proffessions.map((proffession, i) => (
                    <div key={i}>
                        {
                            proffession.occupations.map((occupation, i) => (
                                <PositionChild 
                                    occupation={occupation}
                                    key={i}
                                />
                            ))
                        }
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default AdminPositionScreen
