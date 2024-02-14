import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  //single selection
  //multi selection

  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  //   console.log(selected);

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndxOfCurrentId = copyMultiple.indexOf(getCurrentId);

    if (findIndxOfCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(findIndxOfCurrentId, 1);

    setMultiple(copyMultiple);
  }

  console.log(selected, multiple);
  return (
    <div className="wrapper">
      <button onClick={() => setMultiSelected(!multiSelected)}>
        Enable MultiSection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem, idx) => (
            <div className="item" key={idx}>
              <div
                onClick={
                  multiSelected
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {multiSelected
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}

              {/* {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
