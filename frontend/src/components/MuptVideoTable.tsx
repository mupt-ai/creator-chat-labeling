import MuptTableBase from "../components-base/MuptTableBase"
import { GetVideos, DeleteVideo, NewVideo } from "../api/Videos"
import { useState, useEffect } from "react"
import { Row, StringOnly } from "../components-base/MuptTableBase"

type Video = {
    id: number;
    video_id: string;
}

const MuptVideoTable = () => {

    const [creatorId, setCreatorId] = useState(localStorage.getItem("selectedCreatorId"));
    const [currentPage, setCurrentPage] = useState(1);
    const [videos, setVideos] = useState<(Row & StringOnly)[]>([]);

    useEffect(() => {
        if (creatorId == null) {
            return;
        }
        GetVideos(currentPage, 10, parseInt(creatorId)).then((res: Video[]) => {
            res.map((video) => {
                {
                    id: video.id;
                    video_id: video.video_id;
                }
            }, setVideos)
        })
    }, [currentPage, creatorId])

    const columns = [
        { accessor: 'video_id', header: 'Video ID' },
    ]

    return (
        <div className="mr-16 ml-16 mt-16">
            <MuptTableBase
                colNames={columns}
                colData={videos}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onRowDeleteClick={() => () => console.log("bruh")}
                totalPages={10} />
        </div>
    )
}

export default MuptVideoTable;
