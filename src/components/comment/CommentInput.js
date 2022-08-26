import { Avatar, Box, IconButton, TextareaAutosize, Popover, Grid, Button, CircularProgress } from "@material-ui/core";
import { AttachFile, Clear, EmojiEmotions } from "@material-ui/icons";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import './Comment.scss'
import ImageGallery from "../common/image-gallery/ImageGallery";
import { API, CustomToast, makeID } from "../../settings";
import { ENDPOINT_CREATE_COMMENT, ENDPOINT_UPLOAD } from "../../settings/endpoint";
import { getAccessToken } from "../../utils/auth";
import { post } from "../../utils/api";
import moment from "moment";
import { _updateComment } from "../../store/actions/generalActions";

function isFileImage(file) {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return file && acceptedImageTypes.includes(file["type"]);
}

export default function CommentInput({ postId, onCommentSuccess }) {
    const dispatch = useDispatch()
    const { user, setting } = useSelector(state => state)
    const { library } = setting
    const { information } = user
    const ref = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false)
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? "simple-popover" : undefined;

    const handleOpenEmoji = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseEmoji = () => {
        setAnchorEl(null);
    };

    const _handleSelectImage = (e) => {
        const { files } = e.target;
        const tempImages = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            if (element.size < 5000000) {
                if (isFileImage(element)) {
                    tempImages.push(element);
                }
            }
        }
        setImages(tempImages);
        ref.current.focus()
        setFlag(!flag);
    };

    const onEmojiClick = (event, emojiObject) => {
        const cursor = ref.current.selectionStart;
        const text =
            content.slice(0, cursor) + emojiObject.emoji + content.slice(cursor);
        setContent(text);
    };



    const _handleRemoveImage = () => {
        setImages([])
        setFlag(!flag);
    };

    const _handleUploadImage = (index, imgUploaded, callback) => {
        if (images.length === 0) {
            callback()
            return
        }
        var list = imgUploaded;
        var fd = new FormData();
        fd.append("image", images[index]);
        fetch(`${API}${ENDPOINT_UPLOAD}`, {
            headers: {
                Authorization: "bearer " + getAccessToken(),
            },
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((json) => {
                if (!json.success) {
                    console.log(json.data.msg);
                } else {
                    list.push(json.data.url);
                }
                if (index + 1 <= images.length - 1) {
                    _handleUploadImage(index + 1, list, callback);
                } else {
                    if (callback) callback(list);
                }
            })
            .catch((err) => {
                console.log(err);
                if (index + 1 <= images.length - 1) {
                    _handleUploadImage(index + 1, list, callback);
                } else {
                    if (callback) callback(list);
                }
            });
    };

    const _handlePost = (finderKey) => {
        const text = content.trim().split(" ");
        text.forEach((element, index) => {
            if (element.length > 3 && element.includes("#")) {
                text[index] = `<a href="#" class="hashtag">${element}</a>`;
            }
        });
        const result = text.join(" ");
        if (result.length > 1) {
            if (images.length <= 5) {
                setLoading(true);
                onCommentDone(finderKey)
                _handleUploadImage(0, [], (imgUploaded) => {
                    post(
                        ENDPOINT_CREATE_COMMENT,
                        {
                            postId: postId,
                            content: result,
                            images: imgUploaded ? imgUploaded : [],
                        },
                        () => {
                            setLoading(false);
                            const comment = {
                                ownerAddress: information.account,
                                key: finderKey,
                                posting: false
                            }
                            if (onCommentSuccess) onCommentSuccess()
                            // dispatch(_updateComment(comment))
                        },
                        (error) => {
                            CustomToast("error", library[error.code]);
                            setLoading(false);
                        }
                    );
                });
            } else {
                CustomToast("error", "Limit: 5 photos");
            }
        } else {
            CustomToast("error", "Please enter your thoughts.");
        }
    };

    const onCommentDone = (finderKey) => {
        const comment = {
            content: content,
            createdTime: moment().unix() * 1000,
            images: imagesPreview,
            postId: postId,
            ownerAddress: information.account,
            key: finderKey,
            posting: true
        }
        dispatch(_updateComment(comment))
        handleReset()
    }

    const handleReset = () => {
        setLoading(false)
        setImages([])
        setContent("")
        setImagesPreview([])
    }

    const handleKeyUp = (e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            setContent(content.slice(0, -1))
            const k = makeID(10)
            _handlePost(k)
        }
    }

    useEffect(() => {
        const imagesPreview = [];
        images.map((item) => imagesPreview.push(URL.createObjectURL(item)));
        setImagesPreview(imagesPreview);
    }, [flag]);

    return (
        information ? <Box display="flex" justifyContent="space-between" className="comment-input">
            <Avatar src={information.avatarImage} />
            <div className="input-content">
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={1}
                    placeholder={`Comment...`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    ref={ref}
                    onKeyUp={e => handleKeyUp(e)}
                />
                {
                    imagesPreview && imagesPreview[0] && <Box style={{ position: "relative", minWidth: 250, marginLeft: 10 }}>
                        <img
                            src={imagesPreview[0]}
                            alt=""
                            style={{
                                height: 135,
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: 12,
                            }}
                        />
                        <IconButton
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                background: "#fff",
                                opacity: 0.8,
                            }}
                            size="small"
                            onClick={() => _handleRemoveImage()}
                        >
                            <Clear fontSize="small" />
                        </IconButton>
                    </Box>
                }
                <Box display="flex" className="plugin" justifyContent="space-between" >
                    <div>
                        <IconButton aria-describedby={id} onClick={handleOpenEmoji}>
                            <EmojiEmotions style={{ width: 25, height: 25 }} />
                        </IconButton>
                        <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleCloseEmoji}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                        >
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </Popover>
                        <IconButton>
                            <label className="upload create-post">
                                <input
                                    type="file"
                                    onChange={_handleSelectImage}
                                    accept="image/x-png,image/jpeg"
                                    hidden
                                />
                            </label>
                            <AttachFile style={{ width: 21, height: 21 }} />
                        </IconButton>
                    </div>
                </Box>
            </div>
        </Box> : ""
    );
}
