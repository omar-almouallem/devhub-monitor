import React from 'react';
import { Button, Typography } from 'antd';

interface GitHubTokenPromptProps
{
    handleInsertTokenClick: () => void;
}

const GitHubTokenPrompt: React.FC<GitHubTokenPromptProps> = ({ handleInsertTokenClick }) =>
{
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    backgroundColor: "rgb(0, 21, 41)",
                    padding: "20px"
                }}
            >
                <Typography.Text style={{ color: "white", paddingRight: "15px" }}>
                    You don't have a GitHub token yet
                </Typography.Text>
                <Button type="primary" onClick={handleInsertTokenClick}>
                    Add Token
                </Button>
            </div>
        </div>
    );
};

export default GitHubTokenPrompt;
