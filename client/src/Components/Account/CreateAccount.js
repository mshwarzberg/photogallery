import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import speechBubble from "../../images/speechbubble.png";

function CreateAccount() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [tooltipMessage, setTooltipMessage] = useState({
    usernamemsg: {
      tooshort: "Username must be at least 3 characters long",
      toolong: "Username can't be longer than 50 characters",
      valid: false,
    },
    emailmsg: {
      tooshort: "Email must be at least 5 characters long",
      invalidemail: "Email is not valid",
      toolong: "Email can't be longer than 50 characters",
      valid: false,
    },
    passwordmsg: {
      tooshort: "Password must be at least 6 characters long",
      toolong: "Password can't be longer than 50 characters",
      valid: false,
    },
    confirmpasswordmsg: {
      doesnotmatch: "Passwords do not match",
      valid: false,
    },
  });

  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  useEffect(() => {
    // on every render switch back to the default tooltip so that if a user switches input after being validated the register button will be redisabled.
    setTooltipMessage({
      usernamemsg: {
        tooshort: "Username must be at least 3 characters long",
        toolong: "Username can't be longer than 50 characters",
        valid: false,
        render: false,
      },
      emailmsg: {
        tooshort: "Email must be at least 5 characters long",
        invalidemail: "Email is not valid",
        toolong: "Email can't be longer than 50 characters",
        valid: false,
        render: false,
      },
      passwordmsg: {
        tooshort: "Password must be at least 6 characters long",
        toolong: "Password can't be longer than 50 characters",
        valid: false,
        render: false,
      },
      confirmpasswordmsg: {
        doesnotmatch: "Passwords do not match",
        valid: false,
        render: false,
      },
    });
    function validateInp() {
      const username = registerInput.username;
      const email = registerInput.email;
      const password = registerInput.password;
      const confirmpassword = registerInput.confirmpassword;

      let isValid = true;

      if (username.length > 3) {
        if (username.length > 50) {
          isValid = false;
        }
        setTooltipMessage((prevtooltipMessage) => {
          const newData = {
            ...prevtooltipMessage,
            usernamemsg: {
              tooshort: "",
              toolong: isValid
                ? ""
                : "Username can't be longer than 50 characters",
              valid: isValid ? true : false,
            },
          };
          return newData;
        });
      }
      // if the email is valid but too long, set the "tooltip message" so that it'll show that it's too long and not invalid.
      if (email.length > 3) {
        let validateEmail;
        if (
          // I stole this regex. Not sure who wrote it.
          !email.match(
            /^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-.]{0,1}([a-zA-Z][-.]{0,1})*[a-zA-Z0-9].[a-zA-Z0-9]{1,}([.-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
          )
        ) {
          validateEmail = "Email is not valid";
          isValid = false;
        }
        if (email.length > 50) {
          // if the user input is both invalid and too long show invalid error rather than too long error.
          validateEmail = "";
          isValid = false;
        }
        setTooltipMessage((prevtooltipMessage) => {
          const newData = {
            ...prevtooltipMessage,
            emailmsg: {
              tooshort: "",
              invalidemail: validateEmail,
              toolong: isValid
                ? ""
                : "Username can't be longer than 50 characters",
              valid: isValid ? true : false,
            },
          };
          return newData;
        });
      }
      if (password.length > 5) {
        if (password.length > 50) {
          isValid = false;
        }
        setTooltipMessage((prevtooltipMessage) => {
          const newData = {
            ...prevtooltipMessage,
            passwordmsg: {
              tooshort: "",
              toolong: isValid
                ? ""
                : "Password can't be longer than 50 characters",
              valid: isValid ? true : false,
            },
          };
          return newData;
        });
      }
      if (password === confirmpassword && confirmpassword) {
        setTooltipMessage((prevtooltipMessage) => {
          const newData = {
            ...prevtooltipMessage,
            confirmpasswordmsg: {
              doesnotmatch: "",
              valid: isValid ? true : false,
            },
          };
          return newData;
        });
      }
    }
    return validateInp();
  }, [registerInput, setRegisterInput]);

  function registerUser(e) {
    e.preventDefault();

    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerInput),
    };
    fetch("/api/register", fetchOptions)
      .then(async (res) => {
        const { err, msg } = await res.json();
        if (err === "Username taken") {
          return setError("Username taken. Please choose another");
        }
        if (err === "Email taken") {
          return setError("Email already exists. Please use another email");
        }
        if (msg === "VJDx5R4z9z8kYTt7L5h2CQm35IFqURJLoKcVrCVwLS5BXwV3qy") {
          navigate("/login");
        } else {
          return setError("Invalid credentials supplied. Please try again");
        }
      })
      .catch((err) => {
        return;
      });
  }

  function changeRegisterInput(e) {
    const { name, value } = e.target;
    setRegisterInput((prevRegisterInput) => ({
      ...prevRegisterInput,
      [name]: value,
    }));
  }

  function notAllowSubmit() {
    if (tooltipMessage.usernamemsg.valid === false) {
      return true;
    }
    if (tooltipMessage.emailmsg.valid === false) {
      return true;
    }
    if (tooltipMessage.passwordmsg.valid === false) {
      return true;
    }
    if (tooltipMessage.confirmpasswordmsg.valid === false) {
      return true;
    }
    return false;
  }

  function renderTooltip(inputName) {
    if (inputName === "username") {
      return (
        tooltipMessage.usernamemsg.tooshort ||
        tooltipMessage.usernamemsg.toolong ||
        "✔ Username is valid"
      );
    }
    if (inputName === "email") {
      return (
        tooltipMessage.emailmsg.tooshort ||
        tooltipMessage.emailmsg.invalidemail ||
        tooltipMessage.emailmsg.toolong ||
        "✔ Email is valid"
      );
    }
    if (inputName === "password") {
      return (
        tooltipMessage.passwordmsg.tooshort ||
        tooltipMessage.passwordmsg.toolong ||
        "✔ Password is valid"
      );
    } else {
      return (
        tooltipMessage.confirmpasswordmsg.doesnotmatch ||
        "✔ Both passwords match"
      );
    }
  }

  function hideShowTooltip(inputName, bool) {
    setTooltipMessage((prevtooltipMessage) => {
      return {
        ...prevtooltipMessage,
        [inputName]: {
          ...prevtooltipMessage[inputName],
          render: bool,
        },
      };
    });
  }

  return (
    <div className="page" id="register--page">
      <div id="register--block">
        {error ? (
          <h1 className="userform--title" id="userform--title-error">
            {error}
          </h1>
        ) : (
          <h1 className="userform--title">Create Account</h1>
        )}
        <form onSubmit={registerUser} className="userform--form">
          <label htmlFor="userform--username">Enter a new username:</label>
          <div className="userform--input-innerdiv">
            <input
              onChange={changeRegisterInput}
              name="username"
              type="text"
              placeholder="Username"
              id="userform--username"
              className="userform--input"
            />
            <div className="userform--tooltip-innerdiv">
              {tooltipMessage.usernamemsg.render && (
                <div className="userform--speechbubble-innerdiv">
                  <img
                    className="userform--speechbubble"
                    src={speechBubble}
                    alt=""
                  />
                  <p className="userform--speechbubble-text">
                    {renderTooltip("username")}
                  </p>
                </div>
              )}
              <input
                type="button"
                value="?"
                onMouseEnter={() => {
                  hideShowTooltip("usernamemsg", true);
                }}
                onMouseLeave={() => {
                  hideShowTooltip("usernamemsg", false);
                }}
                id={
                  tooltipMessage.usernamemsg.toolong ||
                  tooltipMessage.usernamemsg.tooshort
                    ? "userform--input-tooltip-notallowed"
                    : "userform--input-tooltip-allowed"
                }
                className="userform--input-tooltip"
              />
            </div>
          </div>
          <label htmlFor="userform--email">Enter your email:</label>
          <div className="userform--input-innerdiv">
            <input
              onChange={changeRegisterInput}
              name="email"
              type="email"
              placeholder="Email"
              id="userform--email"
              className="userform--input"
            />
            <div className="userform--tooltip-innerdiv">
              {tooltipMessage.emailmsg.render && (
                <div className="userform--speechbubble-innerdiv">
                  <img
                    className="userform--speechbubble"
                    src={speechBubble}
                    alt=""
                  />
                  <p className="userform--speechbubble-text">
                    {renderTooltip("email")}
                  </p>
                </div>
              )}
              <input
                type="button"
                value="?"
                onMouseEnter={() => {
                  hideShowTooltip("emailmsg", true);
                }}
                onMouseLeave={() => {
                  hideShowTooltip("emailmsg", false);
                }}
                id={
                  tooltipMessage.emailmsg.toolong ||
                  tooltipMessage.emailmsg.tooshort ||
                  tooltipMessage.emailmsg.invalidemail
                    ? "userform--input-tooltip-notallowed"
                    : "userform--input-tooltip-allowed"
                }
                className="userform--input-tooltip"
              />
            </div>
          </div>
          <label htmlFor="userform--password">Create strong password:</label>
          <div className="userform--input-innerdiv">
            <input
              onChange={changeRegisterInput}
              name="password"
              type="password"
              placeholder="Password"
              id="userform--password"
              className="userform--input"
            />
            <div className="userform--tooltip-innerdiv">
              {tooltipMessage.passwordmsg.render && (
                <div className="userform--speechbubble-innerdiv">
                  <img
                    className="userform--speechbubble"
                    src={speechBubble}
                    alt=""
                  />
                  <p className="userform--speechbubble-text">
                    {renderTooltip("password")}
                  </p>
                </div>
              )}
              <input
                type="button"
                value="?"
                onMouseEnter={() => {
                  hideShowTooltip("passwordmsg", true);
                }}
                onMouseLeave={() => {
                  hideShowTooltip("passwordmsg", false);
                }}
                id={
                  tooltipMessage.passwordmsg.toolong ||
                  tooltipMessage.passwordmsg.tooshort
                    ? "userform--input-tooltip-notallowed"
                    : "userform--input-tooltip-allowed"
                }
                className="userform--input-tooltip"
              />
            </div>
          </div>
          <label htmlFor="userform--confirm-password">
            Confirm your password:
          </label>
          <div className="userform--input-innerdiv">
            <input
              onChange={changeRegisterInput}
              name="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              id="userform--confirm-password"
              className="userform--input"
            />
            <div className="userform--tooltip-innerdiv">
              {tooltipMessage.confirmpasswordmsg.render && (
                <div className="userform--speechbubble-innerdiv">
                  <img
                    className="userform--speechbubble"
                    src={speechBubble}
                    alt=""
                  />
                  <p className="userform--speechbubble-text">
                    {renderTooltip("confirmpassword")}
                  </p>
                </div>
              )}
              <input
                type="button"
                value="?"
                onMouseEnter={() => {
                  hideShowTooltip("confirmpasswordmsg", true);
                }}
                onMouseLeave={() => {
                  hideShowTooltip("confirmpasswordmsg", false);
                }}
                id={
                  tooltipMessage.confirmpasswordmsg.doesnotmatch
                    ? "userform--input-tooltip-notallowed"
                    : "userform--input-tooltip-allowed"
                }
                className="userform--input-tooltip"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={registerUser}
            id="userform--submit"
            disabled={notAllowSubmit()}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
