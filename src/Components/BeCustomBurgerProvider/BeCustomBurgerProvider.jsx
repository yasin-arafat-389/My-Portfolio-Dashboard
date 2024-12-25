/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Dialog,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { authContext } from "../../Contexts/AuthContext";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../Hooks/useAxios";

const BeCustomBurgerProvider = ({ refetch }) => {
  let { user } = useContext(authContext);
  let axios = useAxios();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [prices, setPrices] = useState({});

  const handleCheckboxChange = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
      const updatedPrices = { ...prices };
      delete updatedPrices[option];

      setSelectedOptions(updatedOptions);
      setPrices(updatedPrices);
    } else {
      const price = prompt(`Enter the price for ${option}:`);

      if (/^\d+$/.test(price)) {
        const updatedOptions = [...selectedOptions, option];
        const updatedPrices = { ...prices, [option]: parseInt(price) };

        setSelectedOptions(updatedOptions);
        setPrices(updatedPrices);
      } else {
        alert("Please enter a valid number for the price.");
        return;
      }

      if (price) {
        const updatedOptions = [...selectedOptions, option];
        const updatedPrices = { ...prices, [option]: price };

        setSelectedOptions(updatedOptions);
        setPrices(updatedPrices);
      }
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    setLoading(true);

    // Create an array of ingredients based on the selectedOptions and prices
    const ingredients = selectedOptions.map((option) => {
      const id = {
        Tomato: "1",
        Meat: "2",
        Lettuse: "3",
        Cheese: "4",
      }[option];

      const image = {
        Tomato: "https://i.ibb.co/YXK7yd0/tomato.jpg",
        Meat: "https://i.ibb.co/3SbhqGz/meat.jpg",
        Lettuse: "https://i.ibb.co/y0zFvnT/lettuce.jpg",
        Cheese: "https://i.ibb.co/yPGfcVQ/cheese.jpg",
      }[option];

      return {
        id,
        name: option,
        price: parseInt(prices[option]),
        image,
      };
    });

    // Prepare the infoToSubmit object
    const infoToSubmit = {
      provider: user.displayName,
      provider_thumb: user.photoURL,
      ing: ingredients,
    };

    axios.post("/become-provider", infoToSubmit).then(() => {
      setLoading(false);
      setOpen(false);
      refetch();
    });
  };

  return (
    <div>
      <div className="bg-gray-300 rounded-2xl p-4  shadow shadow-sky-800 flex flex-col justify-around items-stretch">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex justify-center items-center">
            <svg
              aria-hidden="true"
              stroke="red"
              width={"50px"}
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
        </div>
        <span className="text-black font-semibold text-xl text-center mt-5">
          {`You're`} not yet providing custom burger service!!
        </span>

        <span className="text-gray-600 text-center mt-2 text-lg">
          To get started, please click the following button and select which
          ingredients you want to provide and how much would you charge for each
          ingredients and you are good to go.
        </span>

        <Button
          onClick={handleOpen}
          className="capitalize mt-5 w-[50%] mx-auto bg-[#0866ff] text-lg"
        >
          Become a custom burger service provider
        </Button>
      </div>

      <Dialog open={open} size="md" handler={handleOpen}>
        <div className="p-5">
          <div className="flex flex-col justify-center items-center mt-5">
            <span className="text-gray-700 text-xl mb-3">
              Select ingredients you want to provide and set price?
            </span>

            <List>
              {["Tomato", "Meat", "Lettuse", "Cheese"].map((option) => (
                <ListItem key={option} className="p-0">
                  <label
                    htmlFor={option}
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id={option}
                        ripple={false}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {option}
                    </Typography>
                  </label>
                  {selectedOptions.includes(option) && (
                    <input
                      disabled
                      className="bg-transparent"
                      value={`৳ ${prices[option] || ""}`}
                      onChange={(e) =>
                        setPrices({ ...prices, [option]: e.target.value })
                      }
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </div>

          <div className="flex justify-center items-center gap-3 mt-4">
            <Button
              className="bg-green-600"
              onClick={handleSubmit}
              disabled={loading || selectedOptions.length === 0 ? true : false}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-5 ">
                  <ImSpinner9 className="animate-spin text-[20px]" />
                  Proceeding
                </div>
              ) : (
                "Proceed"
              )}
            </Button>

            <Button
              disabled={loading ? true : false}
              className="bg-red-600"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BeCustomBurgerProvider;
