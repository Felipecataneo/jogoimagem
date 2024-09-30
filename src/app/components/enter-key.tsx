import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { checkApiKeyIsValid } from "@/hooks/use-llm";

export function EnterKey({ onSuccess }: { onSuccess: (keys: Keys) => void }) {
	const [groqApiKey, setGroqApiKey] = useState<string>("");
	const [working, setWorking] = useState(false);
	const [falied, setFailed] = useState(false);

	async function submit() {
		setWorking(true);

		const isValid = await checkApiKeyIsValid(groqApiKey);

		setWorking(false);

		if (isValid) {
			onSuccess({ groqApiKey });
		} else {
			setFailed(true);
		}
	}

	return (
		<form
			className="max-w-[500px] p-5 flex flex-col items-center gap-5 justify-center m-auto"
			onSubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<div className="w-[300px] h-[200px] bg-[url(/logo-pictollama.png)] bg-no-repeat bg-center bg-contain" />
			<h1 className="text-xl pt-5">Insira Groq API Key</h1>
			<Input
				type="password"
				placeholder="Insira API Key do Groq"
				value={groqApiKey}
				onChange={(e) => setGroqApiKey(e.target.value)}
			/>
			{falied && (
				<div className="text-red-500">
					Requisição falhou. Tente novamente.
				</div>
			)}

			<p className="text-sm ">
				Você conseguir uma em{" "}
				<a
					href="https://console.groq.com/keys"
					// biome-ignore lint/a11y/noBlankTarget: <explanation>
					target="_blank"
					className="text-blue-500"
				>
					Groq Console de Desenvolvimento
				</a>
				.
			</p>
			<Button type="submit" onClick={submit} disabled={working}>
				{working && <LoaderCircle className="animate-spin" size={10} />}
				Salvar & Continuar
			</Button>
		</form>
	);
}
