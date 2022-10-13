import { useRouter } from "next/router";
import Instructions from "../../components/experiment/Instructions";
import Container from "../../components/Layout/Container";

export default function Task1() {
    const router = useRouter();
    const session = router.query.session;

    const beginTaskHandler = () => {
        console.log("Begin task.");
    };

    return (
        <Container className="h-full">
            <Instructions
                session={session}
                task={"Task 1"}
                handleBeginTask={beginTaskHandler}
            />
        </Container>
    );
}
