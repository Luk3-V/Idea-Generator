category_names = [
	"template",
    "single-style",
    "double-style",
    "technique",
    "object",
    "person",
    "animal",
    "setting",
    "adjective"
];

data = `
----------------- Notes ----------------- 
• Categories are defined by #categoryname: ... #end
• Hyperlinks are defined by = ...
• (a) will be replaced with a/an depending on context
• @name@ will be replaced with a call to the corresponding generate function
• [item1, item2] will be replaced w/ a random item in the list 

----------------- TEMPLATE ----------------- 
#template:
1 Create @single-style@ art using @technique@.
1 Create a portait [in (a) @single-style@ art style, using @technique@].
1 Create a landscape [in (a) @single-style@ art style, using @technique@].
2 Create @single-style@ art using @technique@. Show (a) @adjective@ [@object@, @person@, @animal@] in (a) @setting@.
#end

----------------- SINGLE STYLE ----------------- 
#single-style:
2 ASCII                   = https://en.wikipedia.org/wiki/ASCII_art
1 Abstract                = https://en.wikipedia.org/wiki/Abstract_art
1 Aesthetic               = https://en.wikipedia.org/wiki/Aestheticism
3 Afrofuturism            = https://en.wikipedia.org/wiki/Afrofuturism
3 Altermodern             = https://en.wikipedia.org/wiki/Altermodern
2 Anime                   = https://en.wikipedia.org/wiki/Anime
1 Cartoon                 = https://en.wikipedia.org/wiki/Cartoon
3 Cloisonnism             = https://en.wikipedia.org/wiki/Cloisonnism
3 COBRA                   = https://en.wikipedia.org/wiki/COBRA_(art_movement)
3 Color Field             = https://en.wikipedia.org/wiki/Color_Field
3 Computer                = https://en.wikipedia.org/wiki/Computer_art
3 Concrete                = https://en.wikipedia.org/wiki/Concrete_art
3 Conceptual              = https://en.wikipedia.org/wiki/Conceptual_art
3 Constructivism          = https://en.wikipedia.org/wiki/Constructivism_(art)
2 Contemporary            = https://en.wikipedia.org/wiki/Contemporary_art
2 Cubism                  = https://en.wikipedia.org/wiki/Cubism
2 Dadaism                 = https://en.wikipedia.org/wiki/Dada
3 Dau al Set              = https://en.wikipedia.org/wiki/Dau-al-Set
3 Excessivism             = https://en.wikipedia.org/wiki/Excessivism
2 Expressionism           = https://en.wikipedia.org/wiki/Expressionism
3 Fauvism                 = https://en.wikipedia.org/wiki/Fauvism
2 Figurative              = https://en.wikipedia.org/wiki/Figurative_art
3 Figuration Libre        = https://en.wikipedia.org/wiki/Figuration_Libre
1 Fine                    = https://en.wikipedia.org/wiki/Fine_Art
2 Folk                    = https://en.wikipedia.org/wiki/Folk_art
3 Funk                    = https://en.wikipedia.org/wiki/Funk_art
3 Futurism                = https://en.wikipedia.org/wiki/Futurism_(art)
2 Geometric               = https://en.wikipedia.org/wiki/Geometric_abstract_art
2 Graffiti                = https://en.wikipedia.org/wiki/Street_Art
3 Gothic                  = https://en.wikipedia.org/wiki/Gothic_art
3 Hurufiyya               = https://en.wikipedia.org/wiki/Hurufiyya_movement
3 Hypermodernism          = https://en.wikipedia.org/wiki/Hypermodernism_(art)
3 Hyperrealism            = https://en.wikipedia.org/wiki/Hyperrealism_(painting)
3 Illusionism             = https://en.wikipedia.org/wiki/Illusionism_(art)
2 Impressionism           = https://en.wikipedia.org/wiki/Impressionism
3 Interactive             = https://en.wikipedia.org/wiki/Interactive_Art
3 Kinetic                 = https://en.wikipedia.org/wiki/Kinetic_art
3 Kitsch                  = https://en.wikipedia.org/wiki/Kitsch_movement
3 Letterism               = https://en.wikipedia.org/wiki/Letterism
3 Lowbrow                 = https://en.wikipedia.org/wiki/Lowbrow_(art_movement)
3 Mannerism               = https://en.wikipedia.org/wiki/Mannerism
3 Massurealism            = https://en.wikipedia.org/wiki/Massurrealism
3 Maximalism              = https://en.wikipedia.org/wiki/Maximalism
3 Metaphysical            = https://en.wikipedia.org/wiki/Metaphysical_painting
1 Minimalism              = https://en.wikipedia.org/wiki/Minimalism
3 Modernism               = https://en.wikipedia.org/wiki/Modernism
3 Naive                   = https://en.wikipedia.org/wiki/Naive_art
3 Neoclassicism           = https://en.wikipedia.org/wiki/Neoclassicism
3 Neo-Dada                = https://en.wikipedia.org/wiki/Neo-Dada
3 Neo-Expressionism       = https://en.wikipedia.org/wiki/Neo-expressionism
3 Neo-Fauvism             = https://en.wikipedia.org/wiki/Neo-Fauvism
3 Neo-Figurative          = https://en.wikipedia.org/wiki/Neo-figurative
3 Neo-Geo                 = https://en.wikipedia.org/wiki/Neogeo_(art)
3 Neoism                  = https://en.wikipedia.org/wiki/Neoism
3 Neo-Plasticism          = https://en.wikipedia.org/wiki/De_Stijl
3 Neo-Primitivism         = https://en.wikipedia.org/wiki/Neo-primitivism
3 Neo-Romanticism         = https://en.wikipedia.org/wiki/Neo-romanticism
3 New Objectivity         = https://en.wikipedia.org/wiki/New_Objectivity
3 Optical                 = https://en.wikipedia.org/wiki/Op_Art
3 Orphism                 = https://en.wikipedia.org/wiki/Orphism_(art)
1 Photorealism            = https://en.wikipedia.org/wiki/Photorealism
1 Pixel                   = https://en.wikipedia.org/wiki/Pixel_art
3 Plasticien              = https://en.wikipedia.org/wiki/Plasticien
2 Pop                     = https://en.wikipedia.org/wiki/Pop_art
3 Post-Impressionism      = https://en.wikipedia.org/wiki/Post-impressionism
3 Post-Minimalism         = https://en.wikipedia.org/wiki/Postminimalism
3 Precisionism            = https://en.wikipedia.org/wiki/Precisionism
3 Primitivism             = https://en.wikipedia.org/wiki/Primitivism
3 Process                 = https://en.wikipedia.org/wiki/Process_art
2 Psychedelic             = https://en.wikipedia.org/wiki/Psychedelic_art
3 Purism                  = https://en.wikipedia.org/wiki/Purism_(arts)
3 Rasquache               = https://en.wikipedia.org/wiki/Rasquache
3 Rayonism                = https://en.wikipedia.org/wiki/Rayonism
1 Realism                 = https://en.wikipedia.org/wiki/Realism_(arts)
2 Regionalism             = https://en.wikipedia.org/wiki/Regionalism_(art)
3 Remodernism             = https://en.wikipedia.org/wiki/Remodernism
2 Renaissance             = https://en.wikipedia.org/wiki/Renaissance
3 Rococo                  = https://en.wikipedia.org/wiki/Rococo
3 Romanesque              = https://en.wikipedia.org/wiki/Romanesque_art
3 Romanticism             = https://en.wikipedia.org/wiki/Romanticism
2 Serial                  = https://en.wikipedia.org/wiki/Serial_art
3 Shin-hanga              = https://en.wikipedia.org/wiki/Shin_hanga
3 Shock                   = https://en.wikipedia.org/wiki/Shock_art
2 Space                   = https://en.wikipedia.org/wiki/Space_art
2 Superflat               = https://en.wikipedia.org/wiki/Superflat
3 Suprematism             = https://en.wikipedia.org/wiki/Suprematism
1 Surrealism              = https://en.wikipedia.org/wiki/Surrealism
2 Symbolism               = https://en.wikipedia.org/wiki/Symbolism_(arts)
3 Synchronism             = https://en.wikipedia.org/wiki/Synchromism
3 Synthetism              = https://en.wikipedia.org/wiki/Synthetism
3 Tachisme                = https://en.wikipedia.org/wiki/Art_Informel
3 Toyism                  = https://en.wikipedia.org/wiki/Toyism
3 Transgressive           = https://en.wikipedia.org/wiki/Transgressive_art
3 Tonalism                = https://en.wikipedia.org/wiki/Tonalism
3 Ukiyo-e                 = https://en.wikipedia.org/wiki/Ukiyo-e
3 Vanitas                 = https://en.wikipedia.org/wiki/Vanitas
3 Vorticism               = https://en.wikipedia.org/wiki/Vorticism
#end

----------------- DOUBLE STYLE ----------------- 
#double-style:
Abstract Expressionism  = https://en.wikipedia.org/wiki/Abstract_expressionism
Abstract Illusionism    = https://en.wikipedia.org/wiki/Abstract_illusionism
Classical Realism       = https://en.wikipedia.org/wiki/Classical_Realism
Cubo-Futurism           = https://en.wikipedia.org/wiki/Cubo-Futurism
Fantastic Realism       = https://en.wikipedia.org/wiki/Vienna_School_of_Fantastic_Realism
Surreal Automatism      = https://en.wikipedia.org/wiki/Surrealist_automatism
Lyrical Abstraction     = https://en.wikipedia.org/wiki/Lyrical_abstraction
Magic Realism           = https://en.wikipedia.org/wiki/Magic_realism
Modular Constructivism  = https://en.wikipedia.org/wiki/Modular_constructivism
Objective Abstraction   = https://en.wikipedia.org/wiki/Objective_abstraction
#end

----------------- TECHNIQUE ----------------- 
#technique:
1 Acrylic Paint           = https://en.wikipedia.org/wiki/Acrylic_paint
2 Action Painting         = https://en.wikipedia.org/wiki/Action_painting
2 Assemblage              = https://en.wikipedia.org/wiki/Assemblage_(art)
3 Auto-Destructive        = https://en.wikipedia.org/wiki/Auto-destructive_art
1 Charcoal                = https://en.wikipedia.org/wiki/Charcoal_(art)
1 Colored Pencil          = https://en.wikipedia.org/wiki/Colored_pencil
3 Digital Mediums         = https://en.wikipedia.org/wiki/Digital_art
1 Drawing                 = https://en.wikipedia.org/wiki/Drawing
3 Environmental Mediums   = https://en.wikipedia.org/wiki/Environmental_art
2 Fresco                  = https://en.wikipedia.org/wiki/Fresco
1 Gouache                 = https://en.wikipedia.org/wiki/Gouache
2 Kenetic Pointillism     = https://en.wikipedia.org/wiki/Kinetic_Pointillism
1 Oil Paint               = https://en.wikipedia.org/wiki/Oil_painting
2 Plein Air               = https://en.wikipedia.org/wiki/Plein_Air
2 Pointillism             = https://en.wikipedia.org/wiki/Pointillism
2 Printmaking             = https://en.wikipedia.org/wiki/Printmaking
2 Stippling               = https://en.wikipedia.org/wiki/Stippling
1 Photography             = https://en.wikipedia.org/wiki/Photography
1 Watercolor              = https://en.wikipedia.org/wiki/Watercolor
#end
`;