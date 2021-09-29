## Idea Generator

This project utilizes the concept of [Generative Grammar](https://en.wikipedia.org/wiki/Generative_grammar) & involves lexicon of most frequently used English words. 

Words were sorted from the [Google Web Trillion Word Corpus](https://www.kaggle.com/rtatman/english-word-frequency) & [American English Subtitle Corpus](https://www.kaggle.com/lukevanhaezebrouck/subtlex-word-frequency).

# How It Works

Sentences are formed using phrase structures. 
Phrases include: Noun Phrase, Adjective Phrase, Verb Phrase, & Preposition Phrase. 
Phrase structures input an arguement that further specifies the type of noun, adjective, or verb.
Arguements also determine whether the phrase is plural.

When generating, a random sentence template is picked based on complexity.
Templates are filled in recursivly by randomly picking phrases & words based on complexity.
More randomness is added to sentence & phrase structure with optional choices to substitute.

# Data

The datasets are created using this syntax:

• Categories are defined by #categoryname: ... #end
• Hyperlinks are defined by = ...
• Complexity is defined by the 1, 2, or 3
• Subcategories are defined <arg1, arg2>
• !a will be replaced with a/an depending on context
• {category} will be replaced with a call to the corresponding generate function
• {*category} will pluralize the word
• [item1, item2] will be replaced w/ a random item in the list 
• (arg1, arg2) determine what subcategories to pick from