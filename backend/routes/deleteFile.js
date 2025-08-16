import express from 'express';
import fetch from 'node-fetch';
import File from '../models/fileModel.js';
// import { getDropboxToken } from '../utils/dropboxAuth.js';

const routes = express.Router();

const getDropPath = async (url, accessToken) => {
    try {
        // const accessToken = await getDropboxToken();
        const response = await fetch("https://api.dropboxapi.com/2/sharing/get_shared_link_metadata", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });
        const metadata = await response.json();
        if (!metadata || !metadata.path_lower) return -1;
        return metadata.path_lower;
    } catch (err) {
        console.error("Error getting Dropbox path:", err);
        return -1;
    }
};

routes.post('/api/delfile', async (req, res) => {
    const { url, id } = req.body;
    // const accessToken = await getDropboxToken();
    const accessToken = "sl.u.AF5sWdNjQvEvA7i61IBToFacYnvezz6qWtK9jcCqAjHORp_FjdHA_HMm2QsW1Wi9BEe64fLuEuzVruAtwi4RT9RyVDT7GiGhlap-C2KdLl_Zg-B7hB7aSQxcU2Sjumw1hRq37qMzZsTlC1HRgaFuqTTZ27_fzgPg5ChcOD88890LNKOUUnlxRxo8cRMTycL09NvYj0cMeVuOUqdd3YaINkK73hPSVsJkqGj1aQN97FG4hCnHxskEGR7PHMUQdBYWfPaymQjfO9C3xUJR3OXoXFDuUzvVuHcPCnP-0J7hJh4XLAozbn-ZGGzKOraV2BfN2ClAOUDLp_eMhYkOxWQl5Ce9-O7lWAEzns8ZQ_CgckYoswZU0bw49sxaJpAnYMX_LC2m02xF3F5AC3mh1Rqfk0RQGxfwz2KIU2zXPnarfahmUhcxDjAZmD-jXu0eVCM4ROdUpPSfk9aPcGbsic6vn1i4TOl5K7eOYYJyL-_y6Z5cSBVo_ia55T-9-SLhoIEtRBzV8zRhXPp0ZyXa8R8gSbKWilAJh1Y3K5spfnCgBwr7jlxVp1AuwbGdzMHR0iS-vKMH5TwHsIxcZdTQV3BIfSj-1drKFNA794LjVSt7DNWpSkPYC7gIjXOafOhLpZ71PAj7trJvY8S0wWXg6axBpfgxc54ouU8r0THiaW99r3TkmJwhGkAncTxnLzc7RXgbUVz7jLVre8SVR5isW9ecFTWGEdmvtpfOxz15yxwu2E8GQ49MDUSbp2AI-zzLS9YJEhrXY0rLYEDTN-ct7iBPbBByixivzsM_aZgm3kUf_dMwjk2LhI3qp9aBpokjMWor5Mz2T2d8-9esZ1U-PD2SsofYqeSf0MtChOCoi1V96Eg5pxtbh_6Sltjf40O2u2EVuORKCNKQR79JskWpETtRV0hzQ49L1o2TMTHB2VVnQm_1lgzgWc6ZZW_YOjIMl7fm4eOnO45xW7Qcu-nNSFA1RxZUX1HySgguSG1rJw1ZpUPpuq0KTZkLE7LjUQITLRs57AUOP3ELj_wkeSZNTlFd9HOhoWGa625mmReG5Rmu_bQaGogqk1qIsjoTxtKoaVrp6AFHev_tG_WZJ1134zTUIig8ceLzUhpW2oPe2FySjFHf0SVv-wEDB21h_OtCHFse_sxnFaz8fFv7YZVa7clHD40H4smBSArWTBhmxcRfah1g7e4RW3-zwUyhWCUnOTpjPZMgFwXMCXMuIDtdqdd3X8P4rUHiCK6MP1Uzz4SVfofm9fu5xReJ_BRFUMCE0AXSOx6it3qlXni-4ct9R1gp6TVldG7THfanB39ZCUPZIEg3Z1mcgVnhlku3eeY03Pl1FpkNnOV8puKUY3V5JH2-78ggMwD5qwbsxmNzqymmGOyvaQM0CKtvkMCdnVEQUxvx-oMi0ct8gLxfjMQfmzRql8iwgD0hbpxYm-Y341Cg17e8mA";

    try {
        const mongoInstance = await File.findById(id);
        if (!mongoInstance) {
            return res.status(404).json({ message: "File Not Found" });
        }
    } catch {
        return res.status(500).json({ message: "Error while contacting the database." });
    }
    const path = await getDropPath(url, accessToken);
    if (path === -1) return res.status(500).json({ message: "Error occurred while retrieving Dropbox path" });
    try {
       
        const response = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ path })
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(500).json({ message: "Dropbox delete failed", error });
        }

        await File.findByIdAndDelete(id);
        res.status(200).json({ message: "File deleted successfully" });

    } catch (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error occurred while deleting file" });
    }
});

export default routes;
