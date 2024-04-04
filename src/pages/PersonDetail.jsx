import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonMovieGrid from "../components/common/PersonMovieGrid";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import personApi from "../api/modules/person.api";
import { useDispatch } from "react-redux";

const PersonDetail = ({ personId }) => {
  //   const { personId } = useParams();
  const [person, setPerson] = useState();
  //const dispatch = useDispatch();
  let biography = "";
  let backGroundImg = "";
  useEffect(() => {
    const getPerson = async () => {
      try {
        const response = await personApi.getDetails(personId);
        if (response) setPerson(response);
        else {
          console.error(response.err);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPerson();
  }, [personId]);
  if (person && person.biography) {
    biography = person.biography.substring(0, 2000);
    const index = biography.lastIndexOf(".");
    biography = biography.substring(0, index + 1);
    backGroundImg = `https://image.tmdb.org/t/p/w500${
      person && person.profile_path
    }`;
  }
  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${backGroundImg})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${
                      person.birthday && person.birthday.split("-")[0]
                    }`}
                    {person.deathday &&
                      ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(15) }}>
                    {biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="casts">
              <PersonMovieGrid personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
