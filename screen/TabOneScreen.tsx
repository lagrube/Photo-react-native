import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Share,
} from "react-native";
import { Camera } from "expo-camera";
import { CapturedPicture, FlashMode } from "expo-camera/build/Camera.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<Camera | null>();
  const [pictures, setPictures] = useState<CapturedPicture[] | any>([]);
  const [flashMode, setFlashMode] = React.useState<FlashMode | any>("off");

  const [popup, setPopup] = useState<any>();
  const [uriPicture, setUriPicture] = useState<any>();

  const [savePhoto, setSavePhoto] = useState<string>();

  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };

  const renderPicture: React.FunctionComponent<{ item: CapturedPicture }> = ({
    item,
  }) => {
    return (
      <View style={styles.gallery}>
        <Image
          source={{ uri: item.uri }}
          key={item.uri}
          style={styles.imgGallery}
        />
        <View style={styles.blocButton}>
          <TouchableOpacity
            style={styles.buttonPlus}
            onPress={() => {
              onShare(item.uri);
            }}
          >
            <Text style={styles.textButton}>
              <Entypo name="share" size={24} color="black" />​
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPlus}
            onPress={() => {
              savePicture(item.uri);
            }}
          >
            <Text style={styles.textButton}>
              {savePhoto === item.uri ? (
                <Ionicons name="cloud-offline" size={24} color="black" />
              ) : (
                <Ionicons name="cloud-sharp" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonPlus}
            onPress={() => {
              setPopup(true);
              setUriPicture(item.uri);
            }}
          >
            <Text style={styles.textButton}>
              <FontAwesome name="remove" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onShare = async (item: any) => {
    try {
      const result = await Share.share({
        url: item,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const takePicture = () => {
    cameraRef.current &&
      cameraRef.current.takePictureAsync().then((picture) => {
        setPictures([picture, ...pictures]);
      });
  };

  const savePicture = async (item: any) => {
    const res = await MediaLibrary.requestPermissionsAsync();
    if (res.granted) {
      MediaLibrary.saveToLibraryAsync(item).then(() => setSavePhoto(item));
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [Camera]);

  useEffect(() => {
    if (pictures.length > 0) {
      AsyncStorage.setItem("image", JSON.stringify(pictures));
    }
  }, [pictures]);

  useEffect(() => {
    AsyncStorage.getItem("image").then((picture) => {
      picture && setPictures(JSON.parse(picture));
      console.log(picture);
    });
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const styles = StyleSheet.create({
    buttonCamera: {
      width: 80,
      height: 80,
      backgroundColor: "#fff",
      borderRadius: 100,
      borderWidth: 4,
      borderColor: "rgba(0, 0, 0, .5)",
    },
    camera: {
      height: "75%",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    buttonContainer: {
      marginHorizontal: "5%",
      marginVertical: "5%",
      width: "90%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    buttonFlip: {
      backgroundColor: "rgba(0, 0, 0, .5)",
      position: "absolute",
      right: 0,
      width: 70,
      height: 50,
      borderWidth: 4,
      borderColor: "rgba(0, 0, 0, .5)",
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTorch: {
      backgroundColor:
        flashMode === "off" ? "rgba(0, 0, 0, .5)" : "rgba(255, 201, 79, .8)",
      position: "absolute",
      left: 0,
      width: 70,
      height: 50,
      borderWidth: 4,
      borderColor: "rgba(0, 0, 0, .5)",
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textButton: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white",
    },
    galleryBloc: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "25%",
      backgroundColor: "#1e2431",
    },
    gallery: {
      position: "relative",
      width: 170,
      marginHorizontal: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    blocButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-end",
      width: "100%",
      height: 170,
      position: "absolute",
      left: 0,
      bottom: "10%",
    },
    buttonPlus: {
      backgroundColor: "rgba(255, 255, 255, .5)",
      margin: 5,
      width: 45,
      height: 45,
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, .5)",
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    imgGallery: {
      height: 170,
      width: 170,
      borderRadius: 10,
    },
    popup: {
      height: "25%",
    },
    popupTitle: {
      fontWeight: "bold",
      textAlign: "center",
    },
    popupText: {
      padding: 15,
      marginBottom: 20,
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
    },
    popupDelete: {
      backgroundColor: "red",
      marginTop: 20,
      padding: 15,
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  return (
    <View>
      <Camera
        flashMode={flashMode}
        style={styles.camera}
        type={type}
        ref={(camera) => {
          cameraRef.current = camera;
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.textButton}>↺</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTorch}
            onPress={__handleFlashMode}
          >
            <Text style={styles.textButton}>⚡️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCamera}
            onPress={() => takePicture()}
          ></TouchableOpacity>
        </View>
      </Camera>
      {popup ? (
        <View style={styles.popup}>
          <BottomSheet
            isVisible={popup}
            containerStyle={{
              backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
              display: "flex",
            }}
          >
            <Text style={styles.popupTitle}>Êtes vous sûr ?</Text>
            <Text
              onPress={() => {
                setPopup(false);
                if (pictures.length === 1) {
                  AsyncStorage.removeItem("image");
                }
                setPictures(
                  pictures.filter((pict: any) => pict.uri !== uriPicture),
                );
              }}
              style={styles.popupDelete}
            >
              Supprimer
            </Text>
            <Text onPress={() => setPopup(false)} style={styles.popupText}>
              Annuler
            </Text>
          </BottomSheet>
        </View>
      ) : (
        <View style={styles.galleryBloc}>
          <FlatList
            horizontal
            data={pictures}
            renderItem={renderPicture}
            keyExtractor={(item) => item.uri}
          />
        </View>
      )}
    </View>
  );
}
