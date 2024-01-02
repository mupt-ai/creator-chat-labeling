import MuptTableBase from "../components-base/MuptTableBase"
import { useState, useEffect, useContext } from "react"
import { Row } from "../components-base/MuptTableBase"
import { CurrentCreatorContext } from "../pages/Basepage"
import { DeleteTrainingData, GetTrainingData } from "../api/TrainingData"

const PAGE_SIZE = 10;

type TrainingData = {
    id: number;
    video_id: string;
    question: string;
    answer: string;
    date_created: string;
}

const linkStringToLink = (link: string) => {
    return (
        <a href={link} target="_blank" className="text-blue-500 underline">
            {link}
        </a>
    )
}

const stringToText = (text: string) => {
    return (
        <p>
            {text}
        </p>
    )
}

const MuptVideoTable: React.FC<MuptVideoTableProps> = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState<Row[]>([]);
    const [loading, setLoading] = useState(false);
    const { currentCreator } = useContext(CurrentCreatorContext);

    const deleteOnClick = (db_id: number) => () => {
        setLoading(true);
        DeleteTrainingData(db_id).then(() => {
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

        GetTrainingData(currentPage, PAGE_SIZE, parseInt(currentCreator)).then((res: TrainingData[]) => {
            const transformedTrainingData: (Row)[] = res.map((data) => {
                return {
                    id: data.id,
                    keys: ["video_id", "question", "answer", "date_created"],
                    values: [
                        linkStringToLink("https://www.youtube.com/watch?v=" + data.video_id),
                        stringToText(data.question),
                        stringToText(data.answer),
                        stringToText(data.date_created),
                    ]
                };
            });
            setData(transformedTrainingData);
        })

        GetPages(PAGE_SIZE, parseInt(currentCreator)).then((res: number) => {
            setTotalPages(res);
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
                totalPages={totalPages} />
        </div>
    )
}

export default MuptVideoTable;
