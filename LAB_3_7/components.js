import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./component.css";
import Sorting from "./Sorting_Component";

const Navigation_Items = ["Home", "Characters", "Series", "Buy"];

const Main_Title = {
  Title: "Prince of Persia",
  Sub_Title: "The Choice Is Not Yours",
};

const Characters_Array = [
  {
    Title: "Prince",
    Describe:
      "Главный герой истории, вор, бродяга, странник, ищущий своего потерявшегося осла и попавший в новое приключение вместе с Эликой.",
    Quote: [
      "```",
      <br />,
      "Механизмы, рычаги... Рычаги... Механизмы...",
      <br />,
      "Почему нельзя что-то стукнуть, чтобы всё заработало?",
      <br />,
      "```",
    ],
    src: "./images/prince.png",
  },
  {
    Title: "Elika",
    Describe:
      "Последняя принцесса Ахуры, древней расы из странных земель Персии, в которой оказался принц. Она обладает силой Света.",
    Quote: [
      "```",
      <br />,
      "Ты искал свою девушку - Фару.",
      <br />,
      "Вам лучше убраться отсюда и поскарей...",
      <br />,
      "```",
    ],
    src: "./images/elika.png",
  },
];

const Form_Table = [
  {
    year: "1990",
    game: "prince of persia",
    sony: "+",
    microsoft: "+",
    nintendo: "+",
    apple: "+",
  },
  {
    year: "1993",
    game: "prince of persia 2",
    sony: "-",
    microsoft: "+",
    nintendo: "+",
    apple: "+",
  },
  {
    year: "2003",
    game: "The sands of time",
    sony: "+",
    microsoft: "+",
    nintendo: "+",
    apple: "-",
  },
  {
    year: "2004",
    game: "Warrior within",
    sony: "+",
    microsoft: "+",
    nintendo: "+",
    apple: "-",
  },
  {
    year: "2005",
    game: "The two thrones",
    sony: "+",
    microsoft: "+",
    nintendo: "+",
    apple: "+",
  },
  {
    year: "2008",
    game: "prince of persia 4",
    sony: "+",
    microsoft: "+",
    nintendo: "-",
    apple: "+",
  },
  {
    year: "2009",
    game: "The forgoten sands",
    sony: "-",
    microsoft: "-",
    nintendo: "+",
    apple: "-",
  },
  {
    year: "2024",
    game: "The lost crown",
    sony: "+",
    microsoft: "+",
    nintendo: "+",
    apple: "-",
  },
];
const Buy_Element = {
  Title: "Buy the game",
  src: "./images/buy.png",
  Sub_Title: "Prince of Persia",
  Platforms: ["PS3", "Xbox 360", "Windows", "Mac"],
};

export default function Component() {
  const sectionRefs = useRef([]);
  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const CREATE_NAVIGATION = (props) => {
    const Items = [...props.Items];
    const last_element = Items.pop();
    return (
      <div id="Navigation_panel">
        <div id="Nav_Left__Items">
          {Items.map((item, index) => {
            return (
              <input
                type="button"
                value={item}
                onClick={() => scrollToSection(index)}
              />
            );
          })}
        </div>
        <input
          type="button"
          value={last_element}
          onClick={() => scrollToSection(Items.length)}
        />
      </div>
    );
  };

  const CREATE_START_PAGE = (props) => {
    const title = props.Main_Title;

    return (
      <div id="Main_Title" ref={addToRefs}>
        <div id="Title_Wrapper">
          <hr id="hr_up_first" />
          <hr id="hr_up_second" />
          <hr id="hr_up_third" />
          <div id="Title">{title.Title}</div>
          <hr id="hr_down_first" />
          <hr id="hr_down_second" />
          <hr id="hr_down_third" />
          <div id="Sub_Title">{title.Sub_Title}</div>
        </div>
      </div>
    );
  };

  const CREATE_CHARACTERS_PAGE = (props) => {
    const Characters = [...props.Characters_Array];

    return (

        <div id="wrap__wrapper">
      <div id="Character_Wrapper" ref={addToRefs}>
        
          <div id="Character_Prince">
            <div id="Character_Prince__text">
              <div id="Prince__Title">{Characters[0].Title}</div>
              <div id="Prince__Descibe">{Characters[0].Describe}</div>
              <div id="Prince__Quote">{Characters[0].Quote}</div>
            </div>
            <img src={Characters[0].src} />
          </div>


          <div id="Character_Elika">
            <img src={Characters[1].src} />
            <div id="Character_Elika__text">
              <div id="Elika__Title">{Characters[1].Title}</div>
              <div id="Elika__Descibe">{Characters[1].Describe}</div>
              <div id="Elika__Quote">{Characters[1].Quote}</div>
            </div>
          </div>
       
      </div>
      </div>
    );
  };

  const CREATE_FORM_PAGE = (props) => {
    const game_array = props.Form_Table;

    return (
      <div ref={addToRefs} id='form_element'>
        <Sorting />
      </div>
    );
  };

  const CREATE_BUY_PAGE = (props) => {
    const element = props.Buy_Element;

    return (
      <div ref={addToRefs} id='Buy_block'>
        <div id='Buy_Title'>{element.Title}</div>
        <div id='buy_information'>
          <img src={element.src} id='Buy_image'/>
          <div id='buy_text__wrapper'>
            <div id='sub_title'>{element.Sub_Title}</div>
            <div id='buy__elements'>
              {element.Platforms.map((item) => {
                return <a href='#'>{item}</a>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="content">
      <CREATE_NAVIGATION Items={Navigation_Items} />

      <CREATE_START_PAGE Main_Title={Main_Title} />
      <CREATE_CHARACTERS_PAGE Characters_Array={Characters_Array} />
      <CREATE_FORM_PAGE Form_Talbe={Form_Table} />
      <CREATE_BUY_PAGE Buy_Element={Buy_Element} />
    </div>
  );
}
