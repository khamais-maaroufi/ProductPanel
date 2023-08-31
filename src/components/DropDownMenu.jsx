import React, { useState, useEffect } from "react";

import Select from "react-select";

const DropDownMenu = (props) => {
  const [list, setList] = useState([]);
  const { data, setSelected, selected } = props;
  useEffect(() => {
    const options = [];
    data.map((item) => {
      options.push({ value: item.id, label: item.name });
    });
    setList(options);
  }, []);
  // useEffect(() => {
  //   console.log("lis", list);
  // }, [list]);
  const handel = (selectedOption) => {
    if (selectedOption != null) {
      setSelected(selectedOption.value);
    }
    console.log(selected);
  };
  return (
    <>
      {list.length != 0 && (
        <Select
          placeholder={"select a product"}
          isClearable
          options={list}
          defaultValue={selected}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "#bbb",
              primary: "#bbb",
            },
          })}
          onChange={handel}
        />
      )}
    </>
  );
};

export default DropDownMenu;
