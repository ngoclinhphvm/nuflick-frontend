import Container from "./Container.jsx";
import {Typography} from "@mui/material";
const PersonItem = ({ person }) => {
    return (
      <>
        <Container>
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt="film poster"
            style={{ width: "15vw" 
                    
            }}
          />
          <Typography variant="h2" fontSize={"1rem"}>
            {person.name}
          </Typography>
        </Container>
      </>
    );
  };

  export default PersonItem;