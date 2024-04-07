import React, { useEffect, useState } from "react";
import accountApi from "../api/modules/account.api.js";
import { useParams } from "react-router-dom";

function AccountDetail() {
    const [account, setAccount] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const getInfo = async (username) => {
            try {
                const [accountInfo] = await accountApi.getInfo(username);
                console.log('Account info:', accountInfo);
                if (accountInfo) {
                    setAccount(accountInfo);
                } else {
                    console.error('Account info is null');
                }
            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };
        getInfo(username);
    }, [username]);
    return (
        <div >
            <h1>Account Detail</h1>
            {account && (
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", margin: "auto 10px auto 10px"}}>
                    <img
                    src={account.avatar}
                    alt="avatar"
                    width={200}
                    height={250}
                    />
                    <div style ={{margin: "10px 10px auto 20px"}}>
                        <h2>{account.username}</h2>
                        <p>Email: {account.email ? account.email : "null"}</p>
                        <p>Name: {account.name}</p>
                        <p>Gender: {account.gender}</p>
                    </div>
                    
                    {/* Display other properties as needed */}
                </div>
            )}
        </div>
    );
}

export default AccountDetail;
