import { languages } from "../constants/languages";

const GptSearchBar = () => {
    return (
        <div className="flex items-center justify-center pt-[10%]">
            <form className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl">
                <input
                    type="text"
                    className="rounded-lg p-2 border border-gray-300 focus:border-blue-500 focus:outline-none transition-all text-black w-full"
                    placeholder={languages.jp.gptSearchPlaceholder}
                />
                <button className="py-2 px-4 rounded-lg bg-red-500 text-white w-full md:w-auto">
                {languages.jp.search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
