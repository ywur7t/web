import React, { useState } from "react" 
import ReactDOM from "react-dom/client" 
import Array from "./data.js" 
import './Sorting_Component.css';

export default function Sorting() {

    const items = Array
    const keys = Object.keys(items[0]) 

    const [ Select_First,  SET_SELECT_First] = useState("нет") 
    const [ Select_Second,  SET_SELECT_Second] = useState("нет") 
    const [ Select_Third,  SET_SELECT_Third] = useState("нет") 

    const [ CheckBox_First,  SET_CHECKBOX_First] = useState(false) 
    const [ CheckBox_Second,  SET_CHECKBOX_Second] = useState(false) 
    const [ CheckBox_Third,  SET_CHECKBOX_Third] = useState(false) 

    const [Sorted_Items, SET_SORTED_Items] = useState(items) 

//-------------------------------------------------------------//


    const ON_CHANGE_SELECT_First = ({target}) => {

        SET_SELECT_First(target.value) 
        SET_SELECT_Second("нет") 
        SET_SELECT_Third("нет") 
    } 

    const ON_CHANGE_SELECT_Second = ({target}) => {
        
        SET_SELECT_Second(target.value) 
        SET_SELECT_Third("нет") 
    } 

    const ON_CHANGE_SELECT_Third = ({target}) => {
        
        SET_SELECT_Third(target.value) 
    } 

//------------------------------------------//

    const GET_Options = (removed_keys) => {return ["нет", ...keys.filter(key => !removed_keys.includes(key))] } 

//------------------------------------------//

    const ON_CLICK_ClearALL = () => {

        SET_SELECT_First("нет") 
        SET_SELECT_Second("нет") 
        SET_SELECT_Third("нет") 

        SET_CHECKBOX_First(false) 
        SET_CHECKBOX_Second(false) 
        SET_CHECKBOX_Third(false) 

        SET_SORTED_Items(items) 
    } 

    const ON_CLICK_Sort = () => {

        let temporal = [...Sorted_Items] 

        const Sort_Items = (key, desc) => (a, b) => {
            if (a[key] < b[key]) return desc ? 1 : -1 
            if (a[key] > b[key]) return desc ? -1 : 1 
            return 0 
        } 

        if ( Select_Third !== "нет") {
            temporal.sort(Sort_Items( Select_Third,  CheckBox_Third)) 
        }
        if ( Select_Second !== "нет") {
            temporal.sort(Sort_Items( Select_Second,  CheckBox_Second)) 
        }
        if ( Select_First !== "нет") {
            temporal.sort(Sort_Items( Select_First,  CheckBox_First)) 
        }

        SET_SORTED_Items(temporal) 
    } 

  return (
        <div id='content'>
        
<div id='forma'>
        <div>
            <select value={ Select_First} onChange={ON_CHANGE_SELECT_First}>
                {["нет", ...keys].map((key) => (<option key={key} value={key}>{key}</option>))}
            </select>

            <label>
                <input type="checkbox" checked={ CheckBox_First} onChange={(e) =>  SET_CHECKBOX_First(e.target.checked)} disabled={ Select_First === "нет"} />
                По убыванию
            </label>
        </div>

        <div>
            <select value={ Select_Second} onChange={ON_CHANGE_SELECT_Second} disabled={ Select_First === "нет"} >
                {GET_Options([ Select_First]).map((key) => (<option key={key} value={key}>{key}</option>))}
            </select>

            <label>
                <input type="checkbox" checked={ CheckBox_Second} onChange={(e) =>  SET_CHECKBOX_Second(e.target.checked)} disabled={ Select_First === "нет" ||  Select_Second === "нет"} />
                По убыванию
            </label>
        </div>

        <div>
            <select value={ Select_Third} onChange={ON_CHANGE_SELECT_Third} disabled={ Select_First === "нет" ||  Select_Second === "нет"} >
                {GET_Options([ Select_First,  Select_Second]).map((key) => (<option key={key} value={key}>{key}</option>))}
            </select>

            <label>
                <input type="checkbox" checked={ CheckBox_Third} onChange={(e) =>  SET_CHECKBOX_Third(e.target.checked)} disabled={  Select_First === "нет" ||  Select_Second === "нет" ||  Select_Third === "нет" } />
                По убыванию
            </label>
        </div>

        <button onClick={ON_CLICK_ClearALL}>Сбросить</button>
        <button onClick={ON_CLICK_Sort}>Сортировать</button>
</div>

<div id='table_ready'>
        <table>
            <thead>
                <tr> {keys.map((key) => (<th key={key}>{key}</th>))} </tr>
            </thead>

            <tbody>
                {
                    Sorted_Items.map((item, index) => (
                        <tr key={index}>
                            {keys.map((key) => (<td key={key}>{item[key]}</td>))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
</div>
        </div>
    ) 
}
