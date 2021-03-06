import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage: {
        width: 60,
        height: 60,
        display: "block",
        margin: "auto",
        objectFit: "cover",
        borderRadius: "50%",
    },
    commentData: {
        marginLeft: 20,
    },
});

class Comment extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                            src={userImage}
                                            alt=""
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                                component={Link}
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {dayjs(createdAt).format(
                                                    "h:mm a, MMM DD YYYY"
                                                )}
                                            </Typography>
                                            <hr
                                                className={
                                                    classes.invisibleSeparator
                                                }
                                            />
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);
