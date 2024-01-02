import MuptTableBase from "../components-base/MuptTableBase"
import { GetVideos, GetPages, DeleteVideo } from "../api/Videos"
import { useState, useEffect, useContext } from "react"
import { Row } from "../components-base/MuptTableBase"
import { CurrentCreatorContext } from "../pages/Basepage"
import { linkStringToLink } from "../components-helper/helpers"

export type Video = {
    id: number;
    video_id: string;
}

type MuptVideoTableProps = {
    openModal: boolean;
}

const PAGE_SIZE = 10;

const MuptVideoTable: React.FC<MuptVideoTableProps> = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [videos, setVideos] = useState<Row[]>([]);
    const [loading, setLoading] = useState(false);
    const { currentCreator } = useContext(CurrentCreatorContext);

    const deleteOnClick = (db_id: number) => () => {
        setLoading(true);
        DeleteVideo(db_id).then(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (loading) {
            return;
        }

        if (currentCreator == null) {
            return;
        }

        GetVideos(currentPage, PAGE_SIZE, parseInt(currentCreator)).then((res: Video[]) => {
            const transformedVideos: (Row)[] = res.map((video) => {
                return {
                    id: video.id,
                    keys: ["video_id"],
                    values: [linkStringToLink("https://www.youtube.com/watch?v=" + video.video_id)]
                };
            });
            setVideos(transformedVideos);
        })

        GetPages(PAGE_SIZE, parseInt(currentCreator)).then((res) => {
            setTotalPages(res.num_pages);
        })

    }, [currentPage, currentCreator, loading, props.openModal])

    const columns = [
        { accessor: 'video_id', header: 'Video' },
    ]

    return (
        <div className="mr-16 ml-16 mt-16">
            <MuptTableBase
                colNames={columns}
                colData={videos}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onRowDeleteClick={deleteOnClick}
                totalPages={totalPages}
                defaultText="No videos available." />
        </div>
    )
}

export default MuptVideoTable;
