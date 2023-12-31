import React, { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/models/BlogPost.model';
import BlogPostService from '../../../Services/BlogPostService';
import { useParams } from 'react-router-dom';
import {Card, Typography} from '@mui/material';
import CardContent from "@mui/material/CardContent";

const BlogPostPublicPage = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const { blogPostId } = useParams();

    useEffect(() => {
        if (blogPostId) {
            console.log(blogPostId)
            BlogPostService.getBlogPost(blogPostId).then((data) => {
                if (data) {
                    setBlogPosts([data]);
                }
            }).catch(error => { console.log(error + "Can't get BlogPost") });
        }
    }, [blogPostId]);

    return (
        <>
            {blogPosts.map((blogPost) => (
                <div key={blogPost.id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography>
                                Title: {blogPost.title}
                            </Typography>
                            <Typography>
                                Text: {blogPost.text}
                            </Typography>
                            <Typography>
                                Category: {blogPost.categories.map(item => item.name)}
                            </Typography>
                            <Typography>
                                By: {blogPost.user.firstName} {blogPost.user.lastName}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </>
    );
};

export default BlogPostPublicPage;