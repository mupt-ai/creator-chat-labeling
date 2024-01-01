import MuptTableBase from "../components-base/MuptTableBase"
import { GetVideos, GetPages, DeleteVideo, NewVideo } from "../api/Videos"
import { useState, useEffect, useContext } from "react"
import { Row } from "../components-base/MuptTableBase"
import { CurrentCreatorContext } from "../pages/Basepage"

type Video = {
    id: number;
    video_id: string;
}

const PAGE_SIZE = 10;


const MuptVideoTable = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [videos, setVideos] = useState<Row[]>([]);
    const { currentCreator } = useContext(CurrentCreatorContext);

    useEffect(() => {
        if (currentCreator == null) {
            return;
        }
        GetVideos(currentPage, PAGE_SIZE, parseInt(currentCreator)).then((res: Video[]) => {
            const transformedVideos: (Row)[] = res.map((video) => {
                return {
                    id: video.id,
                    keys: ["video_id"],
                    values: ["youtube.com/watch?v=" + video.video_id]
                };
            });
            setVideos(transformedVideos);
        })

        GetPages(PAGE_SIZE, parseInt(currentCreator)).then((res: number) => {
            setTotalPages(res);
        })

    }, [currentPage, currentCreator])

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
                totalPages={totalPages} />
        </div>
    )
}

export default MuptVideoTable;
