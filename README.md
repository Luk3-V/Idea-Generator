# About

This project utilizes the concept of [Generative Grammar](https://en.wikipedia.org/wiki/Generative_grammar) & a lexicon of frequently used English words, to generate random art prompts. 

Words were sorted from the [Google Web Trillion Word Corpus](https://www.kaggle.com/rtatman/english-word-frequency) & [American English Subtitle Corpus](https://www.kaggle.com/lukevanhaezebrouck/subtlex-word-frequency).

## How It Works

Sentences are formed using phrase structures. 
Phrases include: Noun Phrase, Adjective Phrase, Verb Phrase, & Preposition Phrase. 
Phrase structures input an arguement that further specifies the type of noun, adjective, or verb.
Arguements also determine whether the phrase is plural.

When generating, a random sentence template is picked based on complexity.
Templates are filled in recursivly by randomly picking phrases & words based on complexity.
More randomness is added to sentence & phrase structure with optional choices to substitute.

## Data

The datasets are created using this syntax:

* Categories are defined by #categoryname: ... #end
* Hyperlinks are defined by = ...
* Complexity is defined by the 1, 2, or 3
* Subcategories are defined <args>
* !a will be replaced with a/an depending on context
* {category} will be replaced with a call to the corresponding generate function
* {\*category} will pluralize the word
* {category1, category2} will be replaced with a combined category
* [phrase1, phrase2] will be replaced w/ a random variation from all the possible phrases
* (args) determine what subcategories to pick from