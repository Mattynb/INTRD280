# Load necessary libraries
library(tidyverse)
library(openxlsx)
library(optparse)

# Define command-line options
option_list <- list(
  make_option(c("-i", "--input"), type = "character", default = NULL,
              help = "Directory containing count files", metavar = "character"),
  make_option(c("-o", "--output"), type = "character", default = "all_counts.xlsx",
              help = "Output file name [default= %default]", metavar = "character")
)

# Parse options
opt <- parse_args(OptionParser(option_list = option_list))

if (is.null(opt$input)) {
  stop("You must specify an input directory with -i or --input")
}

# List all count files in the directory
count_files <- list.files(path = opt$input, pattern = "_counts.txt$", full.names = TRUE)

L <- lapply(count_files, function(file){
  data <- read.table(file, header = TRUE, stringsAsFactors = FALSE)
  count <- data.frame(GeneID = data[,1], count = as.numeric(data[,7]))
  count$sample <- strsplit(basename(file), split = '_')[[1]][1]
  return(count)
})

count.matrix <- bind_rows(L)
count.matrix <- count.matrix %>% group_by(GeneID, sample) %>% summarise(count = max(count))

count.matrix.wide <- count.matrix %>% pivot_wider(names_from = sample, values_from = count)

# Save the count matrix to the specified output file
write.xlsx(count.matrix.wide, file = opt$output)
