import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import styles from "./ChatBot.module.css";
import {
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { chat_bot_api } from "../../assets/assets";

function ChatBot() {
  const [search, setSearch] = useState("");
  const chatWindowRef = useRef(null);
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const [message, setMessages] = useState([
    {
      sender: "bot",
      message: "Hi, it's great to see you! 👋",
    },
    {
      sender: "bot",
      message: "What information you are looking for?",
    },
  ]);
  const changeVisibilty=()=>{
    setIsChatBotVisible(!isChatBotVisible);
  }


  useEffect(() => {
    isChatBotVisible && scrollToBottom();
  }, [message.length]);

  const [loader, setLoader] = useState(false);
  function scrollToBottom() {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const messages = [...message, { sender: "you", message: search }];
    setMessages(messages);
    sendUserMessage();
  };

  const sendUserMessage = (e) => {
    setLoader(true);
    fetch(`${chat_bot_api}`, {
      method: "POST",
      body: JSON.stringify({
        search_string: search,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        res
          .json()
          .then((res) => {
            res.answer &&
              setMessages([
                ...message,
                { sender: "user", message: search },
                { sender: "bot", message: res.answer },
              ]);
            res.answer && setSearch("");
          })
          .finally((res) => {
            setLoader(false);
          });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {isChatBotVisible ? (
        <Box className={styles.chatbot}>
          <Box className={styles.online}>
            <Box className={styles.badge}>
              <Box>
                <Badge color="success" variant="dot">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.chatbot.com/widget/61f28451fdd7c5000728b4f9/FPBAPaZFOOqqiCbV.png"
                    sx={{ width: 56, height: 56 }}
                  />
                </Badge>
              </Box>
              <Box>
                <Box className={styles.head}>ChatBot</Box>
                <Box className={styles.grey}>Online</Box>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={changeVisibilty}>
                <AiOutlineClose />
              </IconButton>
            </Box>
          </Box>

          <Box ref={chatWindowRef} className={styles.messageShowContainer}>
            {message.map((el) => {
              return (
                <>
                  <Box
                    className={
                      el.sender == "bot" ? styles.botMsg : styles.myMsg
                    }
                  >
                    <Box>{el.message}</Box>
                  </Box>
                </>
              );
            })}
          </Box>

          {loader && <LinearProgress color="secondary" />}

          <Box className={styles.messageInputContainer}>
            <Box component={"form"}>
              <TextField
                fullWidth
                value={search}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disabled={search.trim().length == 0}
                        type="submit"
                        onClick={sendMessage}
                      >
                        <AiOutlineSend />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                placeholder="Type your message here"
                size="small"
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <IconButton onClick={changeVisibilty}>
          <Box className={styles.chatbotIcon}>
            <Avatar
              sx={{ width: "60px", height: "60px" }}
              src={
                "https://cdn.chatbot.com/widget/61f28451fdd7c5000728b4f9/DSjjJVtWgP_jxGWP.png"
              }
            />{" "}
          </Box>
        </IconButton>
      )}
    </>
  );
}

export default ChatBot;
