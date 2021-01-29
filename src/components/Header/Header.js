import {
  createMuiTheme,
  TextField,
  ThemeProvider,
  IconButton,
} from "@material-ui/core";
import React from "react";
import "./Header.css";
import MenuItem from "@material-ui/core/MenuItem";
import countries from "../../data/category";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const Header = ({
  category,
  setCategory,
  setWord,
  word,
  meanings,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const dictionaryApi = async () => {
    if (word !== "") {
      try {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setMeanings(data.data);
      } catch (error) {
        setMeanings(["Error"]);
      }
    }
  };

  const handleLanguageChange = (e) => {
    setCategory(e.target.value);
    setWord("");
    setMeanings([]);
  };
  const handleWordChange = (e) => {
    setWord(e.target.value);
    setMeanings([]);
  };

  return (
    <div className="header">
      <span className="title">Dictionary</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            value={word}
            label="Search a Word"
            onChange={(e) => handleWordChange(e)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleLanguageChange(e)}
            className="select"
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <IconButton onClick={dictionaryApi}>
            <SearchIcon />
          </IconButton>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
